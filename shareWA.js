function getCurrentURL() {
  return window.location.href
}

function shareWhatsApp() {  
    window.open('whatsapp://send?text=getCurrentURL()');  
}  
