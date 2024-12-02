var level = 3
var getImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'

export default function KakaoMapsAPI(routesList){
  const points = routesList.map(route => ({
    name: route.name,
    latlng: { latitude: route.latitude, longitude: route.longitude }
  }));
  console.log("카카오맵에서 받은거 : ",points);

  if(points.length > 0) {
    console.log("Latlng : ", points[0].latlng);
    console.log("title : ", points[0].name);
    const html = `
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
                center: new kakao.maps.LatLng(36.79876109631288, 127.07585238863194),
                level: 3
              };

              var map = new kakao.maps.Map(container, options);

              //마커 찍고 마커들을 한번에 볼 수 있게 지도 범위 재설정
              var pointstest = [
                {
                  content: 'test',
                  latlng: new kakao.maps.LatLng(${points[0].latlng.latitude}, ${points[0].latlng.longitude})
                },
                {
                  content: '${points[1].name}',
                  latlng: new kakao.maps.LatLng(${points[1].latlng.latitude}, ${points[1].latlng.longitude})
                },
                {
                  content: '${points[2].name}',
                  latlng: new kakao.maps.LatLng(${points[2].latlng.latitude}, ${points[2].latlng.longitude})
                },
                {
                  content: '${points[3].name}',
                  latlng: new kakao.maps.LatLng(${points[1].latlng.latitude}, ${points[3].latlng.longitude})
                }
              ];

              var bounds = new kakao.maps.LatLngBounds();

              var i, marker;

              for (i = 0; i < pointstest.length; i++){
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
                  position: pointstest[i].latlng,
                  image: markerImage
                });

                marker.setMap(map);

                bounds.extend(pointstest[i].latlng);

                  //마커에 위치 정보 표시
                var infowindow = new kakao.maps.InfoWindow({
                  content: pointstest[i].content
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

    return html;
  }
}