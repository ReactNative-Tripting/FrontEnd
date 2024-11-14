import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  //all
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  //mainpage
  bannerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  moreText: {
    color: '#888',
    marginTop: 5,
  },
  bannerLink: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  //eventpage
  eventList: {
    paddingHorizontal: 16,
  },
  eventCard: {
    width: 120,
    marginRight: 10,
  },
 /* eventImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },*/
  eventImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  eventDescription: {
    flex: 2,
  },
  eventText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  eventTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventTextDetail: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  calendar: {
    marginVertical: 16,
  },
  scheduleList: {
    paddingHorizontal: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 14,
    color: '#333',
  },

  //store page
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    margin: 4,
    fontSize: 12,
    color: '#333', // 텍스트 색상
  },
  selectedFilter: {
    backgroundColor: '#D0D8FF',
  },
  productList: {
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',  // 중앙 정렬
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트 중앙 정렬
  },
  itemPoints: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center', // 텍스트 중앙 정렬

  },

  //startmenu
  menuContainer: {
		flex: 1,
		paddingHorizontal: 15,
		paddingTop: 15,
	},
  menuImage: {
		width: 384,
		height: 80,
		resizeMode: 'cover',
	},
  menuLabel: {
		fontSize: 18,
		color: '#FFFFFF',
		fontWeight: 'bold',
	},
  labelContainer: {
		flex: 1,
		padding: 12,
	},

  //misionpage
  missionItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#B3E5FC',
    borderRadius: 8,
  },
  missionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  missionLabelContainer: {
    backgroundColor: '#B3E5FC',  // 라벨 배경색
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',  // 텍스트를 중앙 정렬
    justifyContent: 'center',  // 세로 중앙 정렬
  },
  
  // Bottom Navigation Style
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  bottomNavContainer: {
    flex: 1,
    justifyContent: 'flex-end', // 이 부분이 하단에 붙게 합니다
  },
  iconStyle: {
    size: 28,
    color: 'black',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#333', // 기본 텍스트 색상
  },
  navItem: {
    alignItems: 'center',
  },
});

export default commonStyles;
