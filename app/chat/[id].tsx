import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { CONVERSATIONS, REELS } from '../../constants/mockData';

const AI_QUESTIONS = [
    'What tools are best to start with?',
    'Is this skill useful for beginners?',
    'What\'s the best learning path?',
];

export default function ChatScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const conversation = CONVERSATIONS.find(c => c.id === id);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState(conversation?.messages || []);
    const [showAISuggestions, setShowAISuggestions] = useState(true);
    const flatListRef = useRef<FlatList>(null);

    if (!conversation) {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Conversation not found</Text>
            </View>
        );
    }

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMsg = {
            id: `m${Date.now()}`,
            senderId: 'current',
            text: inputText,
            timestamp: 'Just now',
        };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
    };

    const handleAIQuestion = (q: string) => {
        const newMsg = {
            id: `m${Date.now()}`,
            senderId: 'current',
            text: q,
            timestamp: 'Just now',
        };
        setMessages(prev => [...prev, newMsg]);
        setShowAISuggestions(false);
    };

    // Find if any reel is shared in this conversation
    const sharedReel = REELS[0]; // Mock: always show first reel as shared

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <View style={styles.headerAvatar}>
                        <Text style={styles.headerAvatarText}>
                            {conversation.user.name.charAt(0)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.headerName}>{conversation.user.name}</Text>
                        <Text style={styles.headerStatus}>Active now</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons name="videocam-outline" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messagesList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                ListHeaderComponent={() => (
                    <View>
                        {/* Shared Reel Card */}
                        <View style={styles.sharedReelContainer}>
                            <View style={styles.sharedReelLabel}>
                                <Ionicons name="play-circle" size={14} color={Colors.secondary} />
                                <Text style={styles.sharedReelLabelText}>Shared Reel</Text>
                            </View>
                            <TouchableOpacity style={styles.sharedReelCard}>
                                <View
                                    style={[styles.sharedReelGradient, { backgroundColor: Colors.surface }]}
                                >
                                    <Ionicons name="play" size={24} color="rgba(255,255,255,0.7)" />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.sharedReelTitle} numberOfLines={1}>
                                            {sharedReel.title}
                                        </Text>
                                        <Text style={styles.sharedReelCreator}>
                                            by {sharedReel.creatorName}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => {
                    const isMe = item.senderId === 'current';
                    return (
                        <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
                            <View style={[styles.messageBubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                                {isMe ? (
                                    <View
                                        style={[styles.bubbleMeGradient, { backgroundColor: Colors.primary }]}
                                    >
                                        <Text style={styles.messageText}>{item.text}</Text>
                                    </View>
                                ) : (
                                    <Text style={[styles.messageText, { color: Colors.textPrimary }]}>
                                        {item.text}
                                    </Text>
                                )}
                            </View>
                            <Text style={[styles.messageTime, isMe && { textAlign: 'right' }]}>
                                {item.timestamp}
                            </Text>
                        </View>
                    );
                }}
                ListFooterComponent={() => (
                    showAISuggestions ? (
                        <View style={styles.aiSuggestionsContainer}>
                            <View style={styles.aiSuggestionsHeader}>
                                <Ionicons name="sparkles" size={14} color={Colors.accent} />
                                <Text style={styles.aiSuggestionsTitle}>AI Suggested Questions</Text>
                            </View>
                            {AI_QUESTIONS.map((q, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={styles.aiQuestionBtn}
                                    onPress={() => handleAIQuestion(q)}
                                >
                                    <Text style={styles.aiQuestionText}>{q}</Text>
                                    <Ionicons name="arrow-forward" size={14} color={Colors.primaryLight} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : null
                )}
            />

            {/* Input Bar */}
            <View style={styles.inputBar}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message..."
                        placeholderTextColor={Colors.textTertiary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="attach" size={22} color={Colors.textTertiary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                    <View
                        style={[styles.sendGradient, { backgroundColor: Colors.primary }]}
                    >
                        <Ionicons name="send" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        gap: Spacing.md,
    },
    backBtn: {
        padding: Spacing.xs,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: Spacing.md,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary + '30',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAvatarText: {
        color: Colors.primaryLight,
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    headerName: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    headerStatus: {
        color: Colors.success,
        fontSize: FontSize.xs,
    },
    messagesList: {
        padding: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    sharedReelContainer: {
        marginBottom: Spacing.xl,
    },
    sharedReelLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        marginBottom: Spacing.sm,
    },
    sharedReelLabelText: {
        color: Colors.secondary,
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    sharedReelCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    sharedReelGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    sharedReelTitle: {
        color: '#fff',
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    sharedReelCreator: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    messageRow: {
        marginBottom: Spacing.md,
        maxWidth: '80%',
    },
    messageRowMe: {
        alignSelf: 'flex-end',
    },
    messageBubble: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
    },
    bubbleMe: {},
    bubbleOther: {
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.xl,
        borderBottomLeftRadius: BorderRadius.sm,
    },
    bubbleMeGradient: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.xl,
        borderBottomRightRadius: BorderRadius.sm,
    },
    messageText: {
        color: '#fff',
        fontSize: FontSize.md,
        lineHeight: 20,
    },
    messageTime: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        marginTop: Spacing.xs,
        marginHorizontal: Spacing.xs,
    },
    aiSuggestionsContainer: {
        marginTop: Spacing.lg,
        backgroundColor: Colors.accent + '08',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.accent + '20',
    },
    aiSuggestionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        marginBottom: Spacing.md,
    },
    aiSuggestionsTitle: {
        color: Colors.accentLight,
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    aiQuestionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accent + '15',
    },
    aiQuestionText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        flex: 1,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: Spacing.md,
        padding: Spacing.lg,
        paddingBottom: Platform.OS === 'ios' ? 30 : Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.xxl,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    textInput: {
        flex: 1,
        color: '#fff',
        fontSize: FontSize.md,
        maxHeight: 100,
        paddingVertical: 0,
    },
    attachBtn: {
        padding: Spacing.xs,
        marginLeft: Spacing.sm,
    },
    sendBtn: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    sendGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
