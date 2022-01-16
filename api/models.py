from django.db import models
import random
import string
from rest_framework import exceptions


def random_id():
    return ''.join(random.choices(
        string.ascii_lowercase + string.digits, k=8))


def random_id_unique():
    while True:
        new_id = random_id()
        if Game.objects.filter(pk=new_id).first() == None:
            return new_id


def marry_my_cows(game, player):
    player.points *= 2
    player.save()


def kill_your_cows(game, player):
    for other_player in game.players.all():
        if other_player.id != player.id:
            other_player.points = 0
            other_player.save()


def my_cow(game, player):
    player.points += 1
    player.save()


GAME_ACTIONS = {
    "Marry My Cows": {
        "function": marry_my_cows,
        "description": "When the player sees a church, the user can preform this action to double their cows."
    },
    "Kill Your Cows": {
        "function": kill_your_cows,
        "description": "When the player sees a graveyard, the user can preform this action kill all other players cows."
    },
    "My Cow": {
        "function": my_cow,
        "description": "When the player sees an animal , the user can preform this action to double their cows."
    }
}


class GamePlayer(models.Model):
    name = models.CharField(max_length=16)
    points = models.IntegerField(default=0)


class Game(models.Model):
    id = models.CharField(primary_key=True, unique=True,
                          default=random_id_unique, max_length=8)

    players = models.ManyToManyField(GamePlayer, related_name="game")

    def player_action(self, action, player_name):
        player = self.players.filter(name=player_name).first()
        if player is None:
            raise exceptions.ValidationError(
                detail="This player does not exist", code=400)

        if action not in GAME_ACTIONS.keys():
            raise exceptions.ValidationError(
                detail="This action does not exist", code=400)

        GAME_ACTIONS[action]["function"](self, player)

    def new_player(self, player_name):
        player = self.players.filter(name=player_name).first()
        if player is None:
            player = GamePlayer.objects.create(name=player_name)
            self.players.add(player)
        else:
            raise exceptions.ValidationError(
                detail="This player already exists", code=400)

    def remove_player(self, player_name):
        player = self.players.filter(name=player_name).first()
        if player is not None:
            self.players.remove(player)
        else:
            raise exceptions.ValidationError(
                detail="This player does not exist", code=400)
