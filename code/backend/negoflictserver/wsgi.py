"""
WSGI config for negoflictserver project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

SERVER_BASE = 'c:/Apache24/_projects/negoflict/server'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'negoflictserver.settings')

sys.path.append(SERVER_BASE)
sys.path.append(f'{SERVER_BASE}/agora')
sys.path.append(f'{SERVER_BASE}/core')
sys.path.append(f'{SERVER_BASE}/negoflict_app')
sys.path.append(f'{SERVER_BASE}/negoflictserver')
sys.path.append(f'{SERVER_BASE}/session')

application = get_wsgi_application()
