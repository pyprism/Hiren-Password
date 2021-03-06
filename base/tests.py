from django.test import TestCase
from django.shortcuts import reverse
from rest_framework.test import APIClient
from .models import Account


class Login(TestCase):

    def setUp(self):
        self.client = APIClient()
        Account.objects.create_user('hiren', 'password')

    def test_auth_token(self):
        response = self.client.post(reverse("login"), {'username': 'hiren', 'password': 'password'})
        self.assertEqual(response.status_code, 200)
        self.assertTrue('token' in response.json())

    def test_error(self):
        response = self.client.post(reverse("login"), {'username': 'hiren', 'password': 'bad password'})
        self.assertEqual(response.status_code, 401)
        self.assertTrue('error' in response.json())
