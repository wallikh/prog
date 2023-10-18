function isPalindrome(word) {
    word = word.replace(/\s/g, '');

    return word === word.split('').reverse().join('');
  }
  console.log(isPalindrome("non"));
  function getKmDistance(lat1, lng1, lat2, lng2) {
    const earthRadiusKm = 6371; // Rayon moyen de la Terre en kilomètres
  
    // Conversion des coordonnées de degrés en radians
    const lat1Rad = toRadians(lat1);
    const lng1Rad = toRadians(lng1);
    const lat2Rad = toRadians(lat2);
    const lng2Rad = toRadians(lng2);
  
    // Différences de coordonnées en radians
    const latDiff = lat2Rad - lat1Rad;
    const lngDiff = lng2Rad - lng1Rad;
  
    // Calcul de la distance en utilisant la formule de la haversine
    const a = Math.sin(latDiff / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lngDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
  
    return distance;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  // Exemple d'utilisation :
  const distance = getKmDistance(48.8566, 2.3522, 40.7128, -74.0060);
  console.log(`La distance entre Paris et New York est d'environ ${distance} km.`);  