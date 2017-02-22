$('#open-ui-sidebar').on('click', () => {
  $('.ui.sidebar').sidebar('toggle');
});

$('#pricing-slider').on('input', function(e) {
  const climberCount = e.currentTarget.value;

  $('#pricing-climbers').html(climberCount);

  if (climberCount <= 40) {
    $('#pricing-plan').html('FREE');
    $('#pricing-price').html('0');
  } else if (climberCount <= 180) {
    $('#pricing-plan').html('AMATEUR');

    const price = (climberCount - 50) * .3 + 20;
    $('#pricing-price').html(price);
  } else if (climberCount <= 200) {
    $('#pricing-plan').html('PRO');
    $('#pricing-price').html('60');
  } else {
    $('#pricing-plan').html('PRO');

    const price = (climberCount - 200) * .3 + 20;
    $('#pricing-price').html(price);
  }
});

// Facebook share button on header
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=502179363281634";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




// Google Analytics
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-91870246-1', 'auto');
ga('send', 'pageview');
*/


// Drift
/*
!function() {
  var t;
  if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
  t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
  t.factory = function(e) {
    return function() {
      var n;
      return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
    };
  }, t.methods.forEach(function(e) {
    t[e] = t.factory(e);
  }), t.load = function(t) {
    var e, n, o, i;
    e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
    o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
    n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
  });
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('gfrb2riaiw84');
*/
