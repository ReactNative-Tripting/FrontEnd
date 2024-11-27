import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const App = () => {
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const endpoint =""
    const apiKey = ""

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

        const formData = new FormData();
        formData.append("file", {
            uri: imageFile.uri,
            name: imageFile.name,
            type: imageFile.type,
        });

        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    "Prediction-Key": apiKey,
                    "Content-Type": "multipart/form-data",
                },
            });

            const predictions = response.data.predictions;
            if (predictions && predictions.length > 0) {
                const bestPrediction = predictions.reduce((max, prediction) =>
                    prediction.probability > max.probability ? prediction : max
                );

                if (bestPrediction.tagName.toLowerCase() === "negative") {
                    Alert.alert(
                        "미션 실패",
                        `태그: ${bestPrediction.tagName}\n확률: ${(bestPrediction.probability * 100).toFixed(2)}%`
                    );
                } else {
                    Alert.alert(
                        "미션 성공",
                        `태그: ${bestPrediction.tagName}\n확률: ${(bestPrediction.probability * 100).toFixed(2)}%`
                    );
                }
            } else {
                Alert.alert("분석 결과", "적합한 예측 결과가 없습니다.");
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            Alert.alert("오류 발생", "이미지 업로드에 실패했습니다.");
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
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            {imageFile && (
                <TouchableOpacity style={styles.button} onPress={submitToApi}>
                    <Text style={styles.buttonText}>이미지 파일 제출</Text>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
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
