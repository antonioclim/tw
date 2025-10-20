/**
* 2 - Urmăriți videoclipul S4v2.mp4 pentru a vedea cum se moștenește un tip obiectual în Javascript și cum se compun tipurile obiectuale.
* După ce ați testat exemplul, implementați următoarea structură de tipuri. 
* Software este un tip care are metoda 'run'. 
* Browser moștenește Software și poate adăuga și instala Plugin. 
* Un Browser poate avea multiple Plugin.
*
*/



class Robot {
  constructor (name) {
    this.name = name
  }

  move () {
    console.log(`${this.name} is moving`)
  }
}

const r0 = new Robot('some robot')
r0.move()

class Weapon {
  constructor (description) {
    this.description = description
  }

  fire () {
    console.log(`${this.description} is firing`)
  }
}

const w0 = new Weapon('pew pew laser')
w0.fire()

class CombatRobot extends Robot {
  constructor (name) {
    super(name)
    this.weapons = []
  }

  addWeapon (w) {
    this.weapons.push(w)
  }

  fire () {
    console.log('firing all weapons')
    for (const w of this.weapons) {
      w.fire()
    }
  }
}

const r1 = new CombatRobot('some combat robot')
r1.addWeapon(w0)
r1.fire()

Robot.prototype.fly = function () {
  console.log(`${this.name} is flying`)
}

r1.fly()
