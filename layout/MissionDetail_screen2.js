import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const App = () => {
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const endpoint = ""
    const apiKey = ""

    // 테스트용 이미지 URL 배열
    const testImages = [
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDlfNTYg%2FMDAxNzA5OTU0ODIyODk1.N5aM9-uokJieBh-fltd6V3yogGI6S_Ce0EABDjcRbdcg._ELu4EMV3MROiHruLM3fTDt1elD0VvwenZ4OhFc5j4gg.PNG%2F%25BF%25B5%25BC%25F6%25C1%25F51.png&type=sc960_832"
    ];

    const selectTestImage = (index) => {
        setImageUri(testImages[index]);
        setImageFile({
            uri: testImages[index],
            name: `test-image-${index + 1}.jpg`,
            type: "image/jpeg",
        });
    };

    const openCamera = () => {
        launchCamera(
            {
                mediaType: "photo",
                saveToPhotos: true,
            },
            (response) => {
                if (response.didCancel) {
                    console.log("사용자가 취소했습니다.");
                } else if (response.errorCode) {
                    console.error("에러:", response.errorMessage);
                } else {
                    const asset = response.assets[0];
                    setImageUri(asset.uri);
                    setImageFile({
                        uri: asset.uri,
                        name: asset.fileName || "photo.jpg",
                        type: asset.type || "image/jpeg",
                    });
                }
            }
        );
    };

    const openGallery = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
            },
            (response) => {
                if (response.didCancel) {
                    console.log("사용자가 취소했습니다.");
                } else if (response.errorCode) {
                    console.error("에러:", response.errorMessage);
                } else {
                    const asset = response.assets[0];
                    setImageUri(asset.uri);
                    setImageFile({
                        uri: asset.uri,
                        name: asset.fileName || "photo.jpg",
                        type: asset.type || "image/jpeg",
                    });
                }
            }
        );
    };

    const submitToApi = async () => {
        if (!imageFile) {
            Alert.alert("이미지를 선택해주세요!");
            return;
        }

        try {
            const response = await axios.post(
                endpoint,
                { url: imageFile.uri },
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": apiKey,
                        "Content-Type": "application/json",
                    },
                    params: {
                        language: "unk",
                        detectOrientation: "true",
                    },
                }
            );

            const extractedText = response.data.regions
                .flatMap(region => region.lines)
                .flatMap(line => line.words)
                .map(word => word.text)
                .join(" ");

            if (extractedText) {
                Alert.alert("추출된 텍스트", extractedText);
            } else {
                Alert.alert("분석 결과", "텍스트를 추출할 수 없습니다.");
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            Alert.alert("오류 발생", "이미지 분석에 실패했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Text style={styles.buttonText}>카메라 열기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openGallery}>
                <Text style={styles.buttonText}>갤러리 열기</Text>
            </TouchableOpacity>
            {testImages.map((_, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => selectTestImage(index)}>
                    <Text style={styles.buttonText}>{`테스트 이미지 ${index + 1} 선택`}</Text>
                </TouchableOpacity>
            ))}
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            {imageFile && (
                <TouchableOpacity style={styles.button} onPress={submitToApi}>
                    <Text style={styles.buttonText}>텍스트 추출</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default App;