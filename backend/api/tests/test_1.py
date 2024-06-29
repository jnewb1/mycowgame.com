from django.test import TestCase

from api.models import Game, GamePlayer


class Test1(TestCase):
    def test_create_game(self):
        r = self.client.post('/api/v1/games/', {}, format='json')

    def test_new_player(self):
        game = Game.objects.create()

        r = self.client.post(
            f'/api/v1/games/{game.pk}/new-player/', {"name": "test1"})

        r = self.client.post(
            f'/api/v1/games/{game.pk}/new-player/', {"name": "test2"})

        self.assertEqual(len(r.data["players"]), 2)

        # Duplicate player name
        r = self.client.post(
            f'/api/v1/games/{game.pk}/new-player/', {"name": "test2"})

        self.assertEqual(r.status_code, 400)

    def test_remove_player(self):
        game = Game.objects.create()
        game.players.add(GamePlayer.objects.create(name="test1"))
        game.players.add(GamePlayer.objects.create(name="test2"))

        r = self.client.post(
            f'/api/v1/games/{game.pk}/remove-player/', {"name": "test1"})

        r = self.client.post(
            f'/api/v1/games/{game.pk}/remove-player/', {"name": "test2"})

        self.assertEqual(len(r.data["players"]), 0)

        # Player doesn't exist
        r = self.client.post(
            f'/api/v1/games/{game.pk}/remove-player/', {"name": "test3"})

        self.assertEqual(r.status_code, 400)

    def test_actions(self):
        game = Game.objects.create()
        game.players.add(GamePlayer.objects.create(name="test1"))
        game.players.add(GamePlayer.objects.create(name="test2"))

        r = self.client.post(
            f'/api/v1/games/{game.pk}/player-action/', {
                "player": "test1", "action": "My Cow"}
        )

        r = self.client.post(
            f'/api/v1/games/{game.pk}/player-action/', {
                "player": "test1", "action": "Marry My Cows"}
        )

        r = self.client.post(
            f'/api/v1/games/{game.pk}/player-action/', {
                "player": "test1", "action": "Kill Your Cows"}
        )

        # Invalid player name
        r = self.client.post(
            f'/api/v1/games/{game.pk}/player-action/', {
                "player": "test3", "action": "Kill Your Cows"}
        )
        self.assertEqual(r.status_code, 400)

        # Invalid action name
        r = self.client.post(
            f'/api/v1/games/{game.pk}/player-action/', {
                "player": "test1", "action": "Your Mama"}
        )
        self.assertEqual(r.status_code, 400)
