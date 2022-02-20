from api.models import Game, GamePlayer, GAME_ACTIONS
from rest_framework import serializers
from django.db.models.functions import Lower


class GamePlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GamePlayer
        fields = ['name', 'points']


class GameSerializer(serializers.HyperlinkedModelSerializer):
    actions = serializers.SerializerMethodField()
    players = serializers.SerializerMethodField()

    def get_actions(self, game: Game):
        ret = []

        for name, data in GAME_ACTIONS.items():
            ret.append({
                "name": name,
                "description": data["description"]
            })

        return ret

    def get_players(self, game: Game):
        players = game.players.order_by(Lower('name')).all()

        return GamePlayerSerializer(players, many=True, context=self.context).data

    class Meta:
        model = Game
        fields = ['pk', 'players', 'actions']


class GameActionSerializer(serializers.Serializer):
    action = serializers.CharField()
    player = serializers.CharField()


class GamePlayerSerializer(serializers.Serializer):
    name = serializers.CharField()
    points = serializers.IntegerField()
