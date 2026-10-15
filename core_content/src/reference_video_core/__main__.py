from __future__ import annotations

import argparse

from .models import ReferenceProfile
from .pipeline import EditingJob, EditingPipeline


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create a reference-style edit with FFmpeg.")
    parser.add_argument("source", help="Path to the input video")
    parser.add_argument("output", help="Path for the rendered video")
    parser.add_argument("--target-duration", type=float, help="Maximum output duration in seconds")
    parser.add_argument("--cut-duration", type=float, help="Maximum source duration per planned clip in seconds")
    parser.add_argument("--speed", type=float, default=1.0, help="Playback speed multiplier")
    parser.add_argument("--name", default="cli-profile", help="Name stored on the reference profile")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    profile = ReferenceProfile(
        args.name,
        target_duration=args.target_duration,
        cut_duration=args.cut_duration,
        speed=args.speed,
    )
    job = EditingJob(args.source, args.output, profile)
    pipeline = EditingPipeline()
    analysis = pipeline.analyze(job)
    plan = pipeline.plan(job, analysis)
    pipeline.render(job)
    output = pipeline.verify(job)
    print(f"Rendered {job.output_path}")
    print(f"Planned duration: {plan.output_duration:.2f}s")
    print(f"Output duration: {output.duration:.2f}s")


if __name__ == "__main__":
    main()
