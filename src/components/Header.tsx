import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { Feather } from '@expo/vector-icons';
import { HEADER_HEIGHT } from "../utils/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export const Header = ({onPressRight}) => {
    const insets = useSafeAreaInsets();
    return(
        <View style={[styles.headerWrapper, { height: insets.top + HEADER_HEIGHT , paddingTop: insets.top }]}>
        <View style={styles.headerEdge}></View>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Products</Text>
        </View>
        <Pressable style={styles.headerEdge} onPress={onPressRight}>
            <Feather name="plus" size={24} color={colors.primaryColor} />
        </Pressable>
    </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomColor: colors.primaryColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerEdge: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerContainer: {
        flex: 4,
        justifyContent: "center"
    },
    headerText: {
        textAlign: "center",
        fontWeight: "bold",
        color: colors.primaryColor,
        fontSize: 20
    }
})