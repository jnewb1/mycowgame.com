from api.models import Game, GamePlayer, GAME_ACTIONS
from rest_framework import serializers


class GamePlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GamePlayer
        fields = ['name', 'points']


class GameSerializer(serializers.HyperlinkedModelSerializer):
    players = GamePlayerSerializer(many=True, read_only=True)
    actions = serializers.SerializerMethodField()

    def get_actions(self, game):
        ret = []

        for name, data in GAME_ACTIONS.items():
            ret.append({
                "name": name,
                "description": data["description"]
            })

        return ret

    class Meta:
        model = Game
        fields = ['pk', 'players', 'actions']


class GameActionSerializer(serializers.Serializer):
    action = serializers.CharField()
    player = serializers.CharField()


class GamePlayerSerializer(serializers.Serializer):
    name = serializers.CharField()
