import requests

import activity_loader
import llm_client
import prompts
import restaurant_loader
import weather


class FakeResponse:
    def __init__(self, payload):
        self.payload = payload

    def raise_for_status(self):
        pass

    def json(self):
        return self.payload


def test_hors_sujet_refuse_sans_appeler_le_modele(monkeypatch):
    client = llm_client.LLMClient()
    monkeypatch.setattr(client.session, "post", lambda *a, **k: (_ for _ in ()).throw(AssertionError))
    assert client.query("Quelle est la capitale du Japon ?") == prompts.get_out_of_scope_message()


def test_question_restaurant_envoie_le_contexte(monkeypatch):
    envoye = {}

    def fake_post(url, json, timeout):
        envoye.update(json)
        return FakeResponse({"message": {"content": "Essaie La Trattoria !"}})

    client = llm_client.LLMClient()
    monkeypatch.setattr(client.session, "post", fake_post)
    assert client.query("Un resto italien pas cher ?") == "Essaie La Trattoria !"
    question = envoye["messages"][-1]["content"]
    assert "[RESTAURANTS]" in question and "Italienne" in question
    assert len(client.conversation_history) == 2


def test_ollama_absent_message_clair_et_historique_propre(monkeypatch):
    def panne(*a, **k):
        raise requests.ConnectionError("refusé")

    client = llm_client.LLMClient()
    monkeypatch.setattr(client.session, "post", panne)
    reponse = client.query("Quel restaurant à Lille ?")
    assert "ollama serve" in reponse
    assert client.conversation_history == []


def test_historique_limite(monkeypatch):
    client = llm_client.LLMClient(max_history=4)
    monkeypatch.setattr(client.session, "post",
                        lambda *a, **k: FakeResponse({"message": {"content": "ok"}}))
    for _ in range(5):
        client.query("Une idée de sortie à Lille ?")
    assert len(client.conversation_history) == 4


def test_filtre_restaurants_par_cuisine_et_prix():
    resultats = restaurant_loader.filter_restaurants(cuisine="Japonaise", price="€", limit=50)
    assert resultats
    assert all(r["cuisine"] == "Japonaise" and r["price_range"] == "€" for r in resultats)


def test_noms_de_restaurants_sans_double_article():
    noms = [r["name"] for r in restaurant_loader.load_restaurants()]
    assert len(noms) == 500
    assert not any(n.startswith("L' ") for n in noms)


def test_activites_adaptees_a_la_pluie():
    texte = activity_loader.get_activities_context({"is_rainy": True})
    noms = [ligne for ligne in texte.splitlines()[1:]]
    assert len(noms) == 3
    assert all("interieur" in ligne for ligne in noms)


def test_meteo_sans_cle_ne_s_invente_pas(monkeypatch):
    monkeypatch.setattr(weather, "OPENWEATHER_API_KEY", None)
    assert "indisponible" in weather.get_weather_recommendation()


def test_meteo_reutilise_les_donnees():
    pluie = {"temperature": 9, "description": "pluie", "is_rainy": True,
             "is_sunny": False, "is_cloudy": False, "fallback": False}
    assert weather.get_weather_recommendation(pluie) == \
        "Il pleut à Lille (9°C). Privilégiez les activités en intérieur."
