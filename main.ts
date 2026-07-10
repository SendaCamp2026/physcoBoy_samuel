namespace SpriteKind {
    export const obstaculo = SpriteKind.create()
    export const Vida = SpriteKind.create()
    export const Puntos = SpriteKind.create()
    export const Helper = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        cantidadSaltos = 0
    }
})
function crearObstaculos () {
    for (let valor of tiles.getTilesByType(assets.tile`obstaculo1`)) {
        mySprite7 = sprites.create(assets.image`Obstaculo`, SpriteKind.obstaculo)
        tiles.placeOnTile(mySprite7, valor)
        tiles.setTileAt(valor, assets.tile`baseTransparency16`)
    }
}
function establecerAyudante () {
    Ayudante = sprites.create(assets.image`Ayudante`, SpriteKind.Helper)
    Ayudante.ay = 0
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cantidadSaltos < MaxSalto) {
        cantidadSaltos += 1
        physco_boy.vy = -200
    }
})
function SpawnEnemigo () {
    if (nivelActual == 1) {
        crearEnemigo("enemigo1", 23, 2, 0, 0, 3)
        crearEnemigo("enemigo2", 7, 7, -30, 0, 2)
    }
}
function configurarPersonaje () {
    physco_boy = sprites.create(assets.image`personaje_1`, SpriteKind.Player)
    physco_boy.ay = 300
    controller.moveSprite(physco_boy, velocidadX, 0)
    scene.cameraFollowSprite(physco_boy)
    info.setLife(3)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Puntos, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
function crearEnemigo (tipo: string, columna: number, fila: number, velocidad_X: number, velocidad_y: number, vida: number) {
    if (tipo == "enemigo1") {
        mySprite8 = sprites.create(assets.image`Enemigo1`, SpriteKind.Enemy)
        sprites.setDataString(mySprite8, "tipo", "enemigo1")
        tiles.placeOnTile(mySprite8, tiles.getTileLocation(columna, fila))
        mySprite8.setVelocity(velocidad_X, velocidad_y)
    } else if (tipo == "enemigo2") {
        mySprite9 = sprites.create(assets.image`enemigo2`, SpriteKind.Enemy)
        sprites.setDataString(mySprite9, "tipo", "enemigo2")
        tiles.placeOnTile(mySprite9, tiles.getTileLocation(columna, fila))
        mySprite9.setVelocity(velocidad_X, velocidad_y)
        mySprite9.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    velocidadX = 200
    controller.moveSprite(physco_boy, velocidadX, 0)
    timer.after(2000, function () {
        velocidadX = 100
        controller.moveSprite(physco_boy, velocidadX, 0)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.obstaculo, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(500, function () {
        sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Vida, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(1)
})
function crearNivel () {
    if (nivelActual == 1) {
        tiles.setCurrentTilemap(tilemap`nivel1`)
        tiles.placeOnTile(physco_boy, tiles.getTileLocation(1, 7))
    }
    crearRecompensas()
    crearObstaculos()
    SpawnEnemigo()
}
function crearRecompensas () {
    for (let valor of tiles.getTilesByType(assets.tile`recompensa1`)) {
        mySprite4 = sprites.create(assets.image`Recompensa1`, SpriteKind.Vida)
        tiles.placeOnTile(mySprite4, valor)
        tiles.setTileAt(valor, assets.tile`baseTransparency16`)
    }
    for (let valor of tiles.getTilesByType(assets.tile`recompensa2`)) {
        mySprite5 = sprites.create(assets.image`recompensa2`, SpriteKind.Food)
        tiles.placeOnTile(mySprite5, valor)
        tiles.setTileAt(valor, assets.tile`baseTransparency16`)
    }
    for (let valor of tiles.getTilesByType(assets.tile`recompensa3`)) {
        mySprite6 = sprites.create(assets.image`recompensa3`, SpriteKind.Puntos)
        tiles.placeOnTile(mySprite6, valor)
        tiles.setTileAt(valor, assets.tile`baseTransparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
})
let direccion = 0
let mySprite6: Sprite = null
let mySprite5: Sprite = null
let mySprite4: Sprite = null
let mySprite9: Sprite = null
let mySprite8: Sprite = null
let physco_boy: Sprite = null
let Ayudante: Sprite = null
let mySprite7: Sprite = null
let cantidadSaltos = 0
let velocidadX = 0
let MaxSalto = 0
let nivelActual = 0
scene.setBackgroundColor(9)
music.setVolume(255)
nivelActual = 1
MaxSalto = 2
velocidadX = 100
configurarPersonaje()
establecerAyudante()
crearNivel()
game.onUpdate(function () {
    physco_boy.setImage(assets.image`personaje_1`)
    Ayudante.setImage(assets.image`Ayudante`)
    direccion = 1
    if (physco_boy.vx == 0) {
        physco_boy.setImage(assets.image`personaje_1`)
    }
    if (physco_boy.vy < 0) {
        physco_boy.setImage(assets.image`personaje_2`)
    } else if (physco_boy.vy > 0) {
        physco_boy.setImage(assets.image`personaje_1`)
    } else if (physco_boy.vx < 0) {
        physco_boy.setImage(assets.image`personaje_1`)
        Ayudante.setImage(assets.image`Ayudante`)
    }
    if (physco_boy.vx < 0) {
        direccion = -1
        physco_boy.image.flipX()
        Ayudante.image.flipX()
    }
})
game.onUpdate(function () {
    Ayudante.setPosition(Ayudante.x + (physco_boy.x - 15 - Ayudante.x) / 5, Ayudante.y + (physco_boy.y - 25 - Ayudante.y) / 5)
})
