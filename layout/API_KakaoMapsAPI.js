var latitude = 36.77209306239864 //신정호
var longitude = 126.983142284749
var level = 3
var getImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'
var setpoints = [
  {
    title: '이순신종합운동장',
    latitude: 36.76819045381245,
    longitude:127.0216227042527
  },
  {
    title: '온양온천역',
    latitude: 36.780519652378175,
    longitude:127.0031870730818
  },
  {
    title: '신정호',
    latitude: 36.77218300926299,
    longitude:126.98201654921148
  }
];

export const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=21b7f10d36fe3943712e7ee551bd0e5a&libraries=services,clusterer,drawing"></script>
  </head>
  <body>
    <div id="map" style="width:100%;height:100%;"></div>
    <script type="text/javascript">
      (function () {
        //기본 세팅
        const container = document.getElementById('map');

        const options = {
          center: new kakao.maps.LatLng(${latitude}, ${longitude}),
          level: ${level}
        };

        var map = new kakao.maps.Map(container, options);

        //마커 찍고 마커들을 한번에 볼 수 있게 지도 범위 재설정
        var points = [
          {
            content: '${setpoints[0].title}',
            latlng: new kakao.maps.LatLng(${setpoints[0].latitude}, ${setpoints[0].longitude})
          },
          {
            content: '${setpoints[1].title}',
            latlng: new kakao.maps.LatLng(${setpoints[1].latitude}, ${setpoints[1].longitude})
          },
          {
            content: '${setpoints[2].title}',
            latlng: new kakao.maps.LatLng(${setpoints[2].latitude}, ${setpoints[2].longitude})
          }
        ];

        var bounds = new kakao.maps.LatLngBounds();

        var i, marker;

        //마커를 찍을 때 이미지 설절
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
            imageSize = new kakao.maps.Size(36, 37),
            imageOption = {
              spriteSize: new kakao.maps.Size(36, 691),
              spriteOrigin: new kakao.maps.Point(0, (3*46)+10),
              offset: new kakao.maps.Point(13,37)
            };

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        for (i = 0; i < points.length; i++){
          //이미지 설정 적용과 마커 찍기
          var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
              imageSize = new kakao.maps.Size(36, 37),
              imageOption = {
                spriteSize: new kakao.maps.Size(36, 691),
                spriteOrigin: new kakao.maps.Point(0, (i*46)+10),
                offset: new kakao.maps.Point(13,37)
              };

          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          marker = new kakao.maps.Marker({
            position: points[i].latlng,
            image: markerImage
          });

          marker.setMap(map);

          bounds.extend(points[i].latlng);

          //마커에 위치 정보 표시
          var infowindow = new kakao.maps.InfoWindow({
            content: points[i].content
          });
          infowindow.open(map, marker);
        }

        function makeOverListener(map, marker, infowindow) {
          return function() {
            infowindow.open(map, marker);
          };
        }

        function makeOutListener(infowindow) {
          return function() {
            infowindow.close();
          };
        }

        map.setBounds(bounds);
      })();
    </script>
  </body>
</html>
`;