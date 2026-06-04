import base64
import hashlib
import hmac
import json
import os
from datetime import datetime, timezone, timedelta


def create_admin_token(admin_id: int, email: str) -> str:
    secret = os.getenv("ADMIN_TOKEN_SECRET", "crowdsense-dev-secret")
    payload = {
        "sub": admin_id,
        "email": email,
        "exp": (datetime.now(timezone.utc) + timedelta(hours=8)).isoformat(),
    }
    payload_json = json.dumps(payload, separators=(",", ":")).encode()
    payload_b64 = base64.urlsafe_b64encode(payload_json).decode().rstrip("=")
    signature = hmac.new(secret.encode(), payload_b64.encode(), hashlib.sha256)
    signature_b64 = base64.urlsafe_b64encode(signature.digest()).decode().rstrip("=")
    return f"{payload_b64}.{signature_b64}"

