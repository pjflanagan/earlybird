import os
from flask import Blueprint, session, redirect, url_for

logout = Blueprint('logout', __name__, template_folder='templates')

# ------------------------------------------------------------------------------
# REQUIRES:
# MODIFIES: destroys the session variable
# EFFECTS: redirects to the main login page
# ------------------------------------------------------------------------------
@logout.route('logout', methods=['GET', 'POST'])
def logout_route():
    session.clear()
    return redirect(url_for('main.main_route'))
