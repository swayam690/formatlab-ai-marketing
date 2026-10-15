from reference_video_core.automatic import GeminiReferenceAnalyzer


def test_gemini_model_failover_uses_fast_models_in_order(monkeypatch) -> None:
    monkeypatch.delenv("GEMINI_FALLBACK_MODELS", raising=False)
    analyzer = GeminiReferenceAnalyzer()

    assert analyzer._models() == (analyzer.model, "gemini-3.5-flash", "gemini-3.5-flash-lite")


def test_gemini_model_failover_can_be_configured(monkeypatch) -> None:
    monkeypatch.setenv("GEMINI_FALLBACK_MODELS", "model-a, model-b")

    assert GeminiReferenceAnalyzer()._models() == ("model-a", "model-b")
