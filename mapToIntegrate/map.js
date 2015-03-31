    var iconList = [];
    var vectorSource = new ol.source.Vector();

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://ol3js.org/en/master/examples/data/icon.png'
      }))
    });

    function addMarker(inst){

       if(inst.lat == null || inst.lon == null)
         return;

       var correctCoord = ol.proj.transform([inst.lon,inst.lat], 'EPSG:4326','EPSG:3857');
       var point=new ol.Feature({
        geometry: new ol.geom.Point(correctCoord,'XY'),
           name: inst.name
      });
       //finalPoint = ol.proj.transform(coord, 'EPSG:4326','EPSG:3857'));
       iconList.push(point);
       point.setStyle(iconStyle);
       vectorSource.addFeature(point);
    }

    function createMarker(list){
      for(var i=0;i<list.length;i++){
          addMarker(list[i]);
      }
    }

    $.get(
      '/api_activeUserCoordinate',
      {},
      function(data){
        test = data.adress;
        createMarker(test);
      },
      'json'
    );

    $.get(
      '/api_streamingUserCoordinate',
      {},
      function(data){
        test = data.adress;
        createMarker(test);
      },
      'json'
    );

    $.get(
      '/api_usersCoordinate',
      {},
      function(data){
        test = data.adress;
        createMarker(test);
      },
      'json'
    );


    for(var i=0; i<iconList.length;i++){
      iconList[i].setStyle(iconStyle);
    }


    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    var rasterLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    var map = new ol.Map({
      layers: [rasterLayer, vectorLayer],
      target: document.getElementById('map'),
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    });

    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false
    });

    map.addOverlay(popup);

    // display popup on click

    map.on('click', function(evt) {
      var feature = map.forEachFeatureAtPixel(evt.pixel,
          function(feature, layer) {
            return feature;
          });
      if (feature) {
        $(element).popover('destroy');
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        popup.setPosition(coord);
        $(element).popover({
          'placement': 'top',
          'html': true,
          'content': '<a href="'+'/institution/'+feature.get('name')+'">'+feature.get('name')+'</a>'
        });
        $(element).popover('show');
      } else {
        $(element).popover('destroy');
      }
    });

    // change mouse cursor when over marker
    $(map.getViewport()).on('mousemove', function(e) {
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return true;
      });
      if (hit) {
        map.getTarget().style.cursor = 'pointer';
      } else {
        map.getTarget().style.cursor = '';
      }
    });
