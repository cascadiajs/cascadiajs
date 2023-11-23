---
title: Sign-up for our newsletter
---

We send at most 2-3 emails per month about upcoming events and
things that may interest our community. You can update these
selections or unsubscribe anytime!

## Sign-up for Emails</h2>

<form method="post" action="/signup">
<input
    type="text"
    name="first_name"
    placeholder="First Name"
    required
/>
<input
    type="text"
    name="last_name"
    placeholder="Last Name"
    required
/>
<input
    type="text"
    name="email_address"
    placeholder="Email Address"
    required
/>

What would you like to hear about? You can update these anytime.

<input type="checkbox" name="lists" value="list-general" /> All
emails<br />
<input type="checkbox" name="lists" value="list-cascadiajs" />
CascadiaJS conference announcements<br />
<input type="checkbox" name="lists" value="list-seattlejs" />
SeattleJS meetup announcements<br />
<input type="checkbox" name="lists" value="list-pacnw" /> Other
PacNW web events, job postings & news<br />
<button name="submit" value="sign-up">Sign Up</button>

</form>

## Unsubscribe

<form method="post" action="/unsubscribe">
<input
    type="text"
    name="email_address"
    placeholder="Email Address"
/>
<button id="unsubscribe" name="submit" value="unsubscribe">
    Unsubscribe
</button>
</form>

## FAQ

### Q: Why was I added to this list?

Folks are added to our email list when they sign-up for Events or
Programs that we run.
