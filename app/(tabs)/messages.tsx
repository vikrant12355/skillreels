import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { CONVERSATIONS, Conversation } from '../../constants/mockData';

function ConversationItem({ conversation }: { conversation: Conversation }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => router.push(`/chat/${conversation.id}`)}
        >
            <View style={styles.avatarContainer}>
                <View
                    style={[styles.avatarBorder, { backgroundColor: conversation.unread > 0 ? Colors.primary : Colors.surfaceLight }]}
                >
                    <View style={styles.avatarInner}>
                        <Text style={styles.avatarText}>
                            {conversation.user.name.charAt(0)}
                        </Text>
                    </View>
                </View>
                {conversation.unread > 0 && (
                    <View style={styles.onlineDot} />
                )}
            </View>

            <View style={styles.conversationInfo}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{conversation.user.name}</Text>
                    <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text
                        style={[styles.lastMessage, conversation.unread > 0 && styles.unreadMessage]}
                        numberOfLines={1}
                    >
                        {conversation.lastMessage}
                    </Text>
                    {conversation.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{conversation.unread}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.username}>@{conversation.user.username}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function MessagesScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Messages</Text>
                    <Text style={styles.headerSubtitle}>Professional conversations</Text>
                </View>
                <TouchableOpacity style={styles.newMsgBtn}>
                    <View
                        style={[styles.newMsgGradient, { backgroundColor: Colors.primary }]}
                    >
                        <Ionicons name="create-outline" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* AI Suggested Connections */}
            <View style={styles.suggestedSection}>
                <View style={styles.suggestedHeader}>
                    <Ionicons name="sparkles" size={14} color={Colors.accent} />
                    <Text style={styles.suggestedTitle}>AI Suggested Connections</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={[
                        { name: 'Marcus J.', skill: 'Cloud Expert', initial: 'M' },
                        { name: 'Nina W.', skill: 'Data Science', initial: 'N' },
                        { name: 'James M.', skill: 'Full-Stack', initial: 'J' },
                    ]}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.suggestedCard}>
                            <View
                                style={[styles.suggestedCardGradient, { backgroundColor: Colors.surfaceLight }]}
                            >
                                <View style={styles.suggestedAvatar}>
                                    <Text style={styles.suggestedAvatarText}>{item.initial}</Text>
                                </View>
                                <Text style={styles.suggestedName}>{item.name}</Text>
                                <Text style={styles.suggestedSkill}>{item.skill}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={{ paddingHorizontal: Spacing.xl }}
                />
            </View>

            {/* Conversations List */}
            <FlatList
                data={CONVERSATIONS}
                renderItem={({ item }) => <ConversationItem conversation={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: Spacing.lg,
    },
    headerTitle: {
        fontSize: FontSize.hero,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
    newMsgBtn: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    newMsgGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    suggestedSection: {
        marginBottom: Spacing.lg,
    },
    suggestedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.md,
    },
    suggestedTitle: {
        color: Colors.accentLight,
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    suggestedCard: {
        width: 100,
        marginRight: Spacing.md,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    suggestedCardGradient: {
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    suggestedAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary + '30',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },
    suggestedAvatarText: {
        color: Colors.primaryLight,
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    suggestedName: {
        color: '#fff',
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    suggestedSkill: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    listContent: {
        paddingHorizontal: Spacing.xl,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.lg,
        gap: Spacing.md,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarBorder: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInner: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '700',
    },
    onlineDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.success,
        borderWidth: 2,
        borderColor: Colors.background,
    },
    conversationInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    name: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    timestamp: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lastMessage: {
        color: Colors.textTertiary,
        fontSize: FontSize.md,
        flex: 1,
        marginRight: Spacing.sm,
    },
    unreadMessage: {
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    username: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    unreadBadge: {
        backgroundColor: Colors.primary,
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadCount: {
        color: '#fff',
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border,
        marginLeft: 68,
    },
});
