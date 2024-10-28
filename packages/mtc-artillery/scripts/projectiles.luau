local HttpService = game:GetService("HttpService")
local ServerStorage = game:GetService("ServerStorage")
local ReplicatedFirst = game:GetService("ReplicatedFirst")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local TankInfo: { [string]: { Dispname: string } } =
	require(ReplicatedStorage:FindFirstChild("TankInfo") :: ModuleScript)
local Tanks = ServerStorage:FindFirstChild("Tanks") :: Folder
local Shells = ReplicatedFirst:FindFirstChild("Shells") :: Folder
local ShellModules = Shells:FindFirstChild("Modules") :: Folder

type Projectile = {
	name: string,
	velocity: number,
	explosiveMass: number?,
	capMultiplier: number?,
	blastMultiplier: number?,
}

type Gun = {
	name: string,
	projectiles: { Projectile },
}

local guns: { [string]: Gun } = {}

function processTank(tank: Model)
	local normalizedName = tank.Name:gsub("[^%w]", "_")
	if normalizedName:match("^[0-9]") then
		normalizedName = `_{normalizedName}`
	end

	local tankInfo = TankInfo[tank.Name]
	if not tankInfo then
		return
	end

	local gun: Gun = {
		name = TankInfo[tank.Name].Dispname,
		projectiles = {},
	}

	local turrets = tank:FindFirstChild("Turrets") :: Folder
	if not turrets then
		return
	end
	for _, turret in turrets:GetChildren() do
		local weapons = turret:FindFirstChild("Weapons") :: Folder
		if not weapons then
			continue
		end
		for _, weapon in weapons:GetChildren() do
			if not weapon:GetAttribute("ARTY") then
				continue
			end

			local shellModule = require(ShellModules:FindFirstChild(weapon.Name) :: ModuleScript)
			for _, ammoType in pairs(shellModule.AmmoTypes) do
				if
					not ammoType.MuzzleSpeed
					or not ammoType.ExplosiveMass
					or not table.find(
						{ "AutoCannon", "Tank_Projectile", "MLRSRocket" },
						ammoType.OverrideProjectileModel
					)
				then
					continue
				end

				local projectile: Projectile = {
					name = ammoType.DisplayName,
					velocity = ammoType.MuzzleSpeed,
					explosiveMass = tonumber(string.format("%.3f", ammoType.ExplosiveMass * (ammoType.Count or 1))),
					capMultiplier = ammoType.ExpCapMult,
					blastMultiplier = ammoType.blastradiusmult,
				}

				local foundDuplicate = false
				for _, existingProjectile in gun.projectiles do
					if existingProjectile.name == projectile.name then
						foundDuplicate = true
						break
					end
				end
				if foundDuplicate then
					continue
				end

				table.insert(gun.projectiles, projectile)
			end
		end
	end

	if #gun.projectiles > 0 then
		guns[normalizedName] = gun
	end
end

for _, model in Tanks:GetChildren() do
	if not model:IsA("Model") then
		continue
	end

	processTank(model)
end

print(HttpService:JSONEncode(guns))
