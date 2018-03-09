+++
title = "About me"
description = "About Joe Palmieri"
draft = false
categories = ["about"]
tags = []
layout = "single"
+++

I'm a web developer currently located in Oakland, California. I specialize in improving customer support workflows using [Ruby on Rails](http://rubyonrails.org/) and [Zendesk](https://www.zendesk.com/). You can find my work in my [GitHub](https://github.com/jpalmieri) and [GitLab](https://gitlab.com/jpalmieri/) profiles, check out my activity on [Stack Overflow](https://stackoverflow.com/users/3376769/jpalmieri), or see my work experience on [LinkedIn](https://www.linkedin.com/in/josephpalmieri/) and my [resume](http://resume.jpalmieri.com).

When I'm not staring at a computer screen, I enjoy spinning fire, playing my ukulele, creating industrial art, and brewing beer.

If you're really curious, you can read my extended [bio](/about/bio).

# Drop me a line

<form name="contact" action="/about/thanks.html" netlify>
  <p>
    <label for="email">Your email:</label>
    <input type="email" name="email" size="40">
  </p>

  <p>
    <label for="message">Message:</label>
    <textarea name="message" size="40" rows="5"></textarea>
  </p>

  <p>
    <button type="submit">submit</button>
  </p>
</form>


<form name="contact" netlify-honeypot="bot-field" action="/thanks.html" netlify>
  <p style="display:none;">
    <label>Don’t fill this out: <input name="bot-field"></label>
  </p>
</form>
