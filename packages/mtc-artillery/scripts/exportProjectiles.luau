local HttpService = game:GetService("HttpService")
local ServerStorage = game:GetService("ServerStorage")
local ReplicatedFirst = game:GetService("ReplicatedFirst")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local InsertService = game:GetService("InsertService")

local TankInfo: { [string]: { Dispname: string, ModelID: number?, Hidden: boolean? } } =
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
	local tankInfo = TankInfo[tank.Name]
	if not tankInfo then
		print(`Failed to find tank info for {tank.Name}`)
		return
	end
	if tankInfo.Hidden then
		return
	end

	local normalizedName = tankInfo.Dispname:gsub("[^%w]", "_")
	if normalizedName:match("^[0-9]") then
		normalizedName = `_{normalizedName}`
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
				if not ammoType.MuzzleSpeed or not ammoType.ExplosiveMass then
					continue
				end

				if
					not table.find(
						{ "AutoCannon", "Tank_Projectile", "MLRSRocket", "STURM", "Smoke" },
						ammoType.OverrideProjectileModel
					)
				then
					print(`{tank.Name}'s {ammoType.DisplayName} not eligible`)
					continue
				end

				local projectile: Projectile = {
					name = ammoType.DisplayName,
					velocity = ammoType.MuzzleSpeed,
					explosiveMass = tonumber(string.format("%.4f", ammoType.ExplosiveMass * (ammoType.Count or 1))),
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

local tempFolder = Instance.new("Folder")
tempFolder.Name = "Temp"
tempFolder.Parent = workspace

for name, tank in TankInfo do
	local model = Tanks:FindFirstChild(name)
	if not model and tank.ModelID then
		local folder = InsertService:LoadAsset(tank.ModelID)
		folder.Parent = tempFolder

		model = folder:FindFirstChildWhichIsA("Model")
		model.Parent = tempFolder
	end

	if model and model:IsA("Model") then
		processTank(model)
	else
		print(`{name} missing model`)
	end
end

tempFolder:Destroy()

print(HttpService:JSONEncode(guns))
