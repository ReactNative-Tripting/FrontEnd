import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  //모든 화면에 사용될 컴포넌트 스타일.
  container: {
    flex: 1,
    backgroundColor: '#fff', //배경 색상
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', //사이에 빈 공간을 넣어, 균일히 공간을 맞추는 설정
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  //메인페이지에서 사용되는 스타일.
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

  //이벤트 페이지에서 사용되는 스타일.
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

  //상점 페이지에서 사용되는 스타일.
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
    color: '#333', 
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
    justifyContent: 'center',  
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
    textAlign: 'center',
  },
  itemPoints: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center', 

  },

  //스타트 메뉴 페이지에서 사용되는 스타일.
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

  //미션 페이지에서 사용되는 스타일.
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
  
  // 하단 네비게이션 페이지에서 사용되는 스타일.
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
    justifyContent: 'flex-end', //하단에 붙게끔 설정.
  },
  iconStyle: {
    size: 28,
    color: 'black',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#333', // 텍스트 색상
  },
  navItem: {
    alignItems: 'center',
  },
  //회원가입
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#A6D8FF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  selectedGenderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#00aaff',
    backgroundColor: '#00aaff',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  }, genderText: {
    color: '#000',
    fontSize: 16,
  },
  selectedGenderText: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default commonStyles;
