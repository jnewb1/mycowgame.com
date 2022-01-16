from api.models import Game
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from api.serializers import GamePlayerSerializer, GameSerializer, GameActionSerializer
from rest_framework.decorators import action


class GameViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=True, methods=['post'], url_path='player-action')
    def player_action(self, request, pk=None):
        game = self.get_object()
        serializer = GameActionSerializer(data=request.data)
        if serializer.is_valid():
            game.player_action(
                serializer.validated_data["action"], serializer.validated_data["player"])
            return self.retrieve(request)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='new-player')
    def new_player(self, request, pk=None):
        game = self.get_object()
        serializer = GamePlayerSerializer(data=request.data)
        if serializer.is_valid():
            game.new_player(serializer.validated_data["name"])
            return self.retrieve(request)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='remove-player')
    def remove_player(self, request, pk=None):
        game = self.get_object()
        serializer = GamePlayerSerializer(data=request.data)
        if serializer.is_valid():
            game.remove_player(serializer.validated_data["name"])
            return self.retrieve(request)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
