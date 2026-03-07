import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { REELS } from '../../constants/mockData';

const MOCK_COMMENTS = [
    { id: '1', user: 'Marcus J.', text: 'This is incredibly insightful! The part about vector databases really resonated with me.', time: '2h ago', likes: 24 },
    { id: '2', user: 'Nina W.', text: 'As a data scientist, I can confirm these trends. Great summary of where the field is heading.', time: '1h ago', likes: 18 },
    { id: '3', user: 'James M.', text: 'Would love to see a follow-up reel on how to actually get started with these tools.', time: '45m ago', likes: 12 },
    { id: '4', user: 'Priya S.', text: 'The security implications of some of these AI tools are worth a separate discussion.', time: '30m ago', likes: 8 },
];

export default function ReelDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const reel = REELS.find(r => r.id === id);
    const [commentText, setCommentText] = useState('');
    const [activeSection, setActiveSection] = useState<'insights' | 'transcript' | 'discussion'>('insights');

    if (!reel) {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#fff', textAlign: 'center', marginTop: 100 }}>Reel not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reel Insights</Text>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Reel preview */}
            <View style={styles.reelPreview}>
                <View
                    style={[styles.reelPreviewGradient, { backgroundColor: Colors.surface }]}
                >
                    <Ionicons name="play-circle" size={32} color="rgba(255,255,255,0.7)" />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.reelTitle}>{reel.title}</Text>
                        <Text style={styles.reelCreator}>by {reel.creatorName} • {reel.duration}s</Text>
                    </View>
                </View>
            </View>

            {/* Section tabs */}
            <View style={styles.tabRow}>
                {([
                    { key: 'insights', label: 'AI Insights', icon: 'sparkles' },
                    { key: 'transcript', label: 'Transcript', icon: 'document-text' },
                    { key: 'discussion', label: 'Discussion', icon: 'chatbubbles' },
                ] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tab, activeSection === tab.key && styles.tabActive]}
                        onPress={() => setActiveSection(tab.key)}
                    >
                        <Ionicons
                            name={tab.icon}
                            size={16}
                            color={activeSection === tab.key ? Colors.primary : Colors.textTertiary}
                        />
                        <Text
                            style={[styles.tabText, activeSection === tab.key && styles.tabTextActive]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Insights Section */}
                {activeSection === 'insights' && (
                    <View style={styles.sectionContent}>
                        {/* Key Insights */}
                        <Text style={styles.sectionTitle}>Key Insights</Text>
                        {reel.aiSummary.keyInsights.map((insight, idx) => (
                            <View key={idx} style={styles.insightCard}>
                                <View
                                    style={[styles.insightNumber, { backgroundColor: [Colors.primary, Colors.secondary, Colors.accent][idx] || Colors.primary }]}
                                >
                                    <Text style={styles.insightNumberText}>{idx + 1}</Text>
                                </View>
                                <Text style={styles.insightText}>{insight}</Text>
                            </View>
                        ))}

                        {/* Takeaway */}
                        <View style={styles.takeawayCard}>
                            <View
                                style={[styles.takeawayGradient, { backgroundColor: Colors.surfaceLight }]}
                            >
                                <Ionicons name="bulb" size={24} color={Colors.primaryLight} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.takeawayLabel}>LEARNING TAKEAWAY</Text>
                                    <Text style={styles.takeawayText}>{reel.aiSummary.takeaway}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Recommended Skills */}
                        <Text style={styles.sectionTitle}>Skills to Learn Next</Text>
                        <View style={styles.skillsGrid}>
                            {reel.aiSummary.recommendedSkills.map((skill, idx) => (
                                <TouchableOpacity key={idx} style={styles.skillCard}>
                                    <View
                                        style={[styles.skillGradient, { backgroundColor: Colors.surfaceLight }]}
                                    >
                                        <Ionicons name="arrow-up-circle" size={20} color={Colors.primaryLight} />
                                        <Text style={styles.skillText}>{skill}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Tags */}
                        <Text style={styles.sectionTitle}>Tags</Text>
                        <View style={styles.tagsRow}>
                            <View style={styles.diffBadge}>
                                <Text style={styles.diffBadgeText}>{reel.difficulty}</Text>
                            </View>
                            {reel.skillTags.map((tag, idx) => (
                                <View key={idx} style={styles.tagChip}>
                                    <Text style={styles.tagText}>#{tag.replace(/\s/g, '')}</Text>
                                </View>
                            ))}
                            {reel.industryTags.map((tag, idx) => (
                                <View key={`ind-${idx}`} style={styles.indTagChip}>
                                    <Text style={styles.indTagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Transcript Section */}
                {activeSection === 'transcript' && (
                    <View style={styles.sectionContent}>
                        <View style={styles.transcriptCard}>
                            <View
                                style={[styles.transcriptGradient, { backgroundColor: Colors.surface }]}
                            >
                                <View style={styles.transcriptHeader}>
                                    <Ionicons name="document-text" size={18} color={Colors.secondary} />
                                    <Text style={styles.transcriptLabel}>Auto-Generated Transcript</Text>
                                </View>
                                <Text style={styles.transcriptText}>{reel.transcript}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Discussion Section */}
                {activeSection === 'discussion' && (
                    <View style={styles.sectionContent}>
                        {MOCK_COMMENTS.map((comment) => (
                            <View key={comment.id} style={styles.commentCard}>
                                <View style={styles.commentHeader}>
                                    <View style={styles.commentAvatar}>
                                        <Text style={styles.commentAvatarText}>{comment.user.charAt(0)}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.commentUser}>{comment.user}</Text>
                                        <Text style={styles.commentTime}>{comment.time}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.commentLikeBtn}>
                                        <Ionicons name="heart-outline" size={16} color={Colors.textTertiary} />
                                        <Text style={styles.commentLikeCount}>{comment.likes}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.commentText}>{comment.text}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Comment Input (visible in discussion) */}
            {activeSection === 'discussion' && (
                <View style={styles.commentInputBar}>
                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add to the discussion..."
                            placeholderTextColor={Colors.textTertiary}
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                    </View>
                    <TouchableOpacity style={styles.commentSendBtn}>
                        <View
                            style={[styles.commentSendGradient, { backgroundColor: Colors.primary }]}
                        >
                            <Ionicons name="send" size={16} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
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
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: Spacing.md,
        paddingHorizontal: Spacing.xl,
    },
    backBtn: {
        padding: Spacing.xs,
    },
    headerTitle: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '700',
    },
    reelPreview: {
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginBottom: Spacing.lg,
    },
    reelPreviewGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    reelTitle: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
        lineHeight: 22,
    },
    reelCreator: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: Spacing.xs,
    },
    tabRow: {
        flexDirection: 'row',
        marginHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xs,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    tabActive: {
        backgroundColor: Colors.surface,
    },
    tabText: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        fontWeight: '600',
    },
    tabTextActive: {
        color: Colors.primaryLight,
    },
    scrollContent: {
        paddingHorizontal: Spacing.xl,
    },
    sectionContent: {},
    sectionTitle: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.md,
        marginTop: Spacing.xl,
    },
    insightCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.md,
        marginBottom: Spacing.lg,
    },
    insightNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    insightNumberText: {
        color: '#fff',
        fontSize: FontSize.sm,
        fontWeight: '800',
    },
    insightText: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        lineHeight: 22,
        flex: 1,
    },
    takeawayCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginTop: Spacing.lg,
    },
    takeawayGradient: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.md,
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.primary + '25',
    },
    takeawayLabel: {
        color: Colors.primaryLight,
        fontSize: FontSize.xs,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: Spacing.xs,
    },
    takeawayText: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        lineHeight: 22,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    skillCard: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    skillGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.primary + '30',
    },
    skillText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    diffBadge: {
        backgroundColor: Colors.primary + '30',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    diffBadgeText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    tagChip: {
        backgroundColor: Colors.secondary + '20',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    tagText: {
        color: Colors.secondaryLight,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    indTagChip: {
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    indTagText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    transcriptCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    transcriptGradient: {
        padding: Spacing.xl,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    transcriptHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    transcriptLabel: {
        color: Colors.secondary,
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    transcriptText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        lineHeight: 24,
    },
    commentCard: {
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.md,
    },
    commentAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary + '30',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentAvatarText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    commentUser: {
        color: '#fff',
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    commentTime: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
    },
    commentLikeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    commentLikeCount: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
    },
    commentText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        lineHeight: 20,
    },
    commentInputBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        padding: Spacing.lg,
        paddingBottom: Platform.OS === 'ios' ? 30 : Spacing.lg,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    commentInputContainer: {
        flex: 1,
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.xxl,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    commentInput: {
        color: '#fff',
        fontSize: FontSize.md,
        paddingVertical: 0,
    },
    commentSendBtn: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    commentSendGradient: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
