from django.apps import AppConfig
import joblib
from langchain.embeddings import HuggingFaceEmbeddings

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')


