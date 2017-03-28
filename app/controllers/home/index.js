import app from '../../app'

app.controller('HomeController', ($scope) => {

  let i
  let self = $scope
  self.finish = false

  const config = [{ 
    'type': 'queen',
    'startLife': 100,
    'life': 100,
    'hit': 8,
    'qtd': 1
  },{
    'type': 'worker',
    'startLife': 75,
    'life': 75,
    'hit': 10,
    'qtd': 5
  }, {
    'type': 'drone',
    'startLife': 50,
    'life': 50,
    'hit': 12,
    'qtd': 8
  }];

  const total = config.reduce( (prev, cur) => ({ qtd: prev.qtd + cur.qtd }) ).qtd

  function bee(type, startLife, life, hit, percent) {
    this.type = type
    this.startLife = startLife
    this.life = life
    this.hit = hit
    this.percent = percent
  }

  self.startGame = function() {

    self.bees = []
    self.finish = false;

    config.forEach( (item) => {
      for(i = 0; i < item.qtd; i++) {
        self.bees.push( new bee(item.type, item.startLife, item.life, item.hit, 100) )
      }
    })

  }

  self.startGame()

  function updatePercent(bee) {
    bee.percent = (bee.life / bee.startLife) * 100
  }

  function finish() {
    self.finish = true;
    self.bees.forEach( (bee) => {
      bee.life = 0
      updatePercent(bee)
    })
  }

  function check() {

    if(self.bees[0].life == 0) {
      finish()
    }

  }

  self.hit = function() {
    const random = Math.floor(Math.random() * total) + 1
    const randomBee = self.bees[random - 1]

    if( randomBee.life > 0 ) {
      randomBee.life -= randomBee.hit
      updatePercent(randomBee)
    } else {
      self.hit()
    }

    if(randomBee.life < 0) {
      randomBee.life = 0
      randomBee.percent = 0
    }

    check()

  }

})