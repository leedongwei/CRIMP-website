$(document).ready(function () {
  $('#ui-sidebar-open').on('click', function () {
    $('.ui.sidebar').sidebar('toggle');
  });


  $('.index-event-logo').popup({ inline: true });


  /**
   *  Contact form
   */
  $('#contact .ui.form').form({
    fields: {
      contact_name: {
        identifier: 'contact_name',
        rules: [{
          type   : 'empty',
          prompt : 'Name: Please tell us your name',
        }],
      },
      contact_email: {
        identifier: 'contact_email',
        rules: [{
          type   : 'empty',
          prompt : 'Email: Please give us a way to contact you',
        }, {
          type   : 'email',
          prompt : 'Email: Please enter a valid email address',
        }],
      },
      contact_website: {
        identifier: 'contact_website',
        optional: true,
        rules: [{
          type   : 'url',
          prompt : 'Website: Please enter a valid website URL',
        }],
      },
      contact_size: {
        identifier: 'contact_size',
        rules: [{
          type   : 'empty',
          prompt : 'Event Size: Please give us an estimate of your event size',
        }],
      },
      contact_country: {
        identifier: 'contact_country',
        rules: [{
          type   : 'empty',
          prompt : 'Country: Please let us know where your event will be held',
        }],
      },
      contact_message: {
        identifier: 'contact_message',
        rules: [{
          type   : 'empty',
          prompt : 'Message: Write us a message! We\' love to hear from you!',
        }],
      },
    },
  });

  $('#contact-submit').on('click', function() {
    var $button = $(this);
    var $form = $button.closest('.ui.form');

    var isValid = $form.form('validate form');
    if (!isValid) return;

    $button.hide();
    $form.removeClass('success error loading');
    $form.addClass('loading');

    var formData = $form.form('get values');
    console.log(formData);


    function handleError(jqXHR, textStatus, errorThrown) {
      $form.removeClass('success error loading');

      $button.show();
      $form.find('.ui.warning.message').show();

      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }

    function handleSuccess(data, textStatus) {
      $form.removeClass('success error loading');
      $form.removeClass('loading');

      if (textStatus === 'success') {
        $form.addClass('success');
      } else {
        $button.show();
        $form.find('.ui.warning.message').show();
      }

      console.log(data);
      console.log(textStatus);
    }


    $.ajax({
      url: '//formspree.io/hello@crimp.rocks',
      method: 'POST',
      data: formData,
      dataType: 'json',
      success: handleSuccess,
      error: handleError,
    });
  });
});


if (window.location.hostname == 'crimp.rocks') {
  // Google Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-91870246-1', 'auto');
  ga('send', 'pageview');


  // Heap Analytics
  // window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
  // heap.load("1757994088");


  // Drift
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
}
