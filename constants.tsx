
import React from 'react';

// The source code is now managed in backend.py. This template is used for UI rendering only.
export const PYTHON_CRAWLER_TEMPLATE = `
import os
import redis
from ollama import Client as OllamaClient
from openai import OpenAI

class HybridRAGEngine:
    """
    RAG ENGINE v2.5
    - Refinement: Ollama (Mistral)
    - Embeddings: OpenAI (text-embedding-3-small)
    - Retrieval: Redis VSS (HNSW)
    """
    def __init__(self, openai_key):
        self.redis = redis.Redis(host='localhost', port=6379)
        self.ollama = OllamaClient(host='http://localhost:11434')
        self.openai = OpenAI(api_key=openai_key)

    def process_page(self, domain, url, html):
        # 1. AI Refinement (Local Ollama)
        refined = self.refine_content(html)
        
        # 2. High-Precision Embedding (OpenAI)
        vector = self.get_embeddings(refined)
        
        # 3. Isolated Storage (Redis)
        self.store_vector(domain, url, refined, vector)

    def get_embeddings(self, text):
        response = self.openai.embeddings.create(
            input=text, model="text-embedding-3-small"
        )
        return response.data[0].embedding

    def refine_content(self, html):
        # Mistral-based cleaning logic...
        return self.ollama.generate(model='mistral', prompt=f"Clean: {html[:2000]}")['response']
`;
