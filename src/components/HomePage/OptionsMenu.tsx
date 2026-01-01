import { View, Text, StyleSheet, Modal, Pressable, useWindowDimensions, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  deckId: string;
  onDelete: (deckId: string) => void;
  onRename: (deckId: string, deckName: string) => void;
}
export default function OptionsMenu({ deckId, onDelete, onRename }: Props) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const iconSize = screenWidth * 0.065;


  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [newDeckName, setDeckName] = useState("");
  const [renamePopupHeight, setRenamePopupHeight] = useState(0);

  const [anchor, setAnchor] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const dotsRef = useRef<View | null>(null);

  const MENU_WIDTH = 170;
  const MENU_HEIGHT = 90;

  const top = Math.min(anchor.y + anchor.h, screenHeight - MENU_HEIGHT - 8);
  const left = Math.min(anchor.x, screenWidth - MENU_WIDTH - 8);


  const p = useSharedValue(0);

  function openMenu() {
    if (!dotsRef.current) return;

    dotsRef.current.measureInWindow((x, y, w, h) => {
      setAnchor({ x, y, w, h });
      setMounted(true);
      setVisible(true);
    });
  }

  function closeMenu() {
    setVisible(false);
  }



  useEffect(() => {
    if (visible) {
      p.value = 0;
      p.value = withTiming(1, { duration: 200 });
    } else if (mounted) {
      p.value = withTiming(0, { duration: 200 }, (finished) => {
        if (finished) runOnJS(setMounted)(false);
      });
    }
  }, [visible, mounted]);

  const menuAnim = useAnimatedStyle(() => {
    return {
      opacity: p.value,
      transform: [
        { translateY: (1 - p.value) * -10 },
        { scaleY: 0.98 + 0.02 * p.value },
      ],
    };
  });


  return (
    <View style={styles.container}>
      <Pressable style={styles.moreButton} ref={dotsRef} onPress={openMenu} hitSlop={10}>
        <AntDesign name="more" size={iconSize} color="black" />
      </Pressable>

      <Modal transparent visible={mounted} onRequestClose={closeMenu} animationType="none">
        <Pressable onPress={closeMenu} style={StyleSheet.absoluteFill} />

        <Animated.View
          style={[
            styles.menu,
            { top, left, width: MENU_WIDTH },
            menuAnim,
          ]}
        >
          <Pressable style={styles.item} onPress={() => { closeMenu(); setRenameVisible(true) }}>
            <Text>Rename</Text>
          </Pressable>

          <Pressable style={styles.item} onPress={() => { closeMenu(); onDelete(deckId) }}>
            <Text>Delete</Text>
          </Pressable>
        </Animated.View>
      </Modal>

      <Modal transparent visible={renameVisible} animationType="fade">
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => { setRenameVisible(false); setDeckName("") }} />

          <View style={styles.popup}>
            <Text style={styles.headerText}>Rename</Text>
            <Text style={styles.nameText}> Name: </Text>
            <TextInput
              value={newDeckName}
              onChangeText={setDeckName}
              placeholder="Name"
              multiline
              onContentSizeChange={(e) =>
                setRenamePopupHeight(e.nativeEvent.contentSize.height)
              }
              maxLength={50}
              style={[styles.inputTextBox, { height: renamePopupHeight }]}
            />

            <Pressable style={styles.confirmButton}
              onPress={() => {onRename(deckId, newDeckName); setRenameVisible(false)}}
            >
              <Text>Confirm</Text>
            </Pressable>
            <Pressable onPress={() => { setRenameVisible(false); setDeckName("");}} style={styles.cancelButton}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal >
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 6,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  moreButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  container: {
    alignItems: "center",
    height: "100%",
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    position: "relative",
    paddingBottom: 100,
  },

  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    position: "absolute",
    top: 20,
    alignSelf: "center"
  },

  cancelButton: {
    position: "absolute",
    bottom: 8,
    left: 18,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12
  },

  confirmButton: {
    position: "absolute",
    bottom: 8,
    right: 18,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12
  },

  nameText: {
    marginTop: 40,
    textAlign: "left"
  },

  inputTextBox: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
    minHeight: 60,
    textAlignVertical: "top",
    marginTop: 5,
  },
});
