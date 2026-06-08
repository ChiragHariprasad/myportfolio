import subprocess
import sys
import os

def run_command(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)

def main():
    # Get the current directory
    cwd = os.getcwd()
    # Construct paths to tsc and vite
    tsc_path = os.path.join(cwd, "node_modules", ".bin", "tsc")
    vite_path = os.path.join(cwd, "node_modules", ".bin", "vite")

    try:
        # Run tsc -b
        run_command([tsc_path, "-b"])
        # Run vite build
        run_command([vite_path, "build"])
        print("Build successful!")
    except subprocess.CalledProcessError as e:
        print(f"Command failed with exit code {e.returncode}")
        print(e.stdout)
        print(e.stderr, file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()