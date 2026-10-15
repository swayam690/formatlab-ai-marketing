# Reference Video Core

Backend-first primitives for reference-based video editing. The core separates media probing, analysis data, style rules, edit planning, deterministic FFmpeg rendering, and render verification so UI and model providers can be added later.

## Development

```bash
python -m pytest
```

## Run a render

From this project directory, render a source video at normal speed:

```bash
PYTHONPATH=src python -m reference_video_core input.mp4 output.mp4
```

Or limit the output to 30 seconds and use 1.25x playback:

```bash
PYTHONPATH=src python -m reference_video_core input.mp4 output.mp4 --target-duration 30 --speed 1.25
```

The machine needs `ffmpeg` and `ffprobe` on `PATH`.

## Run the local UI

```bash
PYTHONPATH=src python -m reference_video_core.web
```

Open `http://127.0.0.1:8000`, upload your source footage and a reference video, review the compatibility result, then download the rendered result. The UI stores temporary job files in `/tmp/reference-video-core`; set `REFERENCE_VIDEO_WORKDIR` to use another location.

## Gemini automatic editing

Set `GEMINI_API_KEY` and install the optional Gemini client to enable reference and source-video understanding:

```bash
python -m pip install -e '.[ai]'
export GEMINI_API_KEY='your-key'
PYTHONPATH=src python -m reference_video_core.web
```

Gemini analyzes both videos and returns a structured compatibility report plus an editing profile: target runtime, cut cadence, playback speed, and selection brief. The default model is `gemini-3.8-flash`; override it with `GEMINI_MODEL` if needed. It stops the render when the source cannot reasonably recreate the reference format, for example when a car montage is supplied for a talking-head reference. Without an API key, the app creates a transparent baseline edit using duration, scene boundaries, and framing only; it does not claim to understand video subjects.

If Gemini reports temporary capacity pressure, the app automatically tries `gemini-3.5-flash` and then `gemini-3.5-flash-lite`. Set `GEMINI_FALLBACK_MODELS` to a comma-separated ordered model list to override that order. If every configured Gemini model is unavailable, the job reports the provider error instead of silently claiming an AI analysis.

`AudioLibrary` provides an intentionally inactive catalog model for licensed music and sound effects. No music or sound effects are selected or added yet.

`FFprobeAnalyzer` provides a production-ready baseline for reading real video duration, frame rate, dimensions, and audio presence. It intentionally creates one source segment; scene detection or model-based semantic analysis can be added as a separate analyzer without changing the planner.
