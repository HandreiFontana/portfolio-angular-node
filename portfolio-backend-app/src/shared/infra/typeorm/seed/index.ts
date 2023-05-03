import { admin } from "./admin"
import { countries } from "./countries"
import { states } from "./states"
import { cities } from "./cities"

async function seeder() {
  await admin()
  await countries()
  await states()
  await cities()
}

seeder()
