import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Animated,
    Modal,
    ScrollView,
    Platform,
    Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { REELS, Reel } from '../../constants/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 88 : 65;

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function AISummaryModal({ reel, visible, onClose }: { reel: Reel; visible: boolean; onClose: () => void }) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={summaryStyles.overlay}>
                <View style={summaryStyles.container}>
                    <View
                        style={[summaryStyles.gradient, { backgroundColor: Colors.surface }]}
                    >
                        {/* Header */}
                        <View style={summaryStyles.header}>
                            <View style={summaryStyles.headerLeft}>
                                <View
                                    style={[summaryStyles.aiIconBg, { backgroundColor: Colors.primary }]}
                                >
                                    <Ionicons name="sparkles" size={16} color="#fff" />
                                </View>
                                <Text style={summaryStyles.headerTitle}>AI Insights</Text>
                            </View>
                            <TouchableOpacity onPress={onClose} style={summaryStyles.closeBtn}>
                                <Ionicons name="close" size={24} color={Colors.textSecondary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Reel Title */}
                            <Text style={summaryStyles.reelTitle}>{reel.title}</Text>

                            {/* Key Insights */}
                            <View style={summaryStyles.section}>
                                <Text style={summaryStyles.sectionTitle}>Key Insights</Text>
                                {reel.aiSummary.keyInsights.map((insight, idx) => (
                                    <View key={idx} style={summaryStyles.insightRow}>
                                        <View style={[summaryStyles.bulletDot, { backgroundColor: [Colors.primary, Colors.secondary, Colors.accent][idx] }]} />
                                        <Text style={summaryStyles.insightText}>{insight}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Takeaway */}
                            <View style={summaryStyles.takeawayCard}>
                                <View
                                    style={[summaryStyles.takeawayGradient, { backgroundColor: Colors.surfaceElevated }]}
                                >
                                    <Ionicons name="bulb" size={20} color={Colors.primaryLight} />
                                    <View style={{ flex: 1, marginLeft: Spacing.md }}>
                                        <Text style={summaryStyles.takeawayLabel}>Learning Takeaway</Text>
                                        <Text style={summaryStyles.takeawayText}>{reel.aiSummary.takeaway}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Recommended Skills */}
                            <View style={summaryStyles.section}>
                                <Text style={summaryStyles.sectionTitle}>Recommended Skills</Text>
                                <View style={summaryStyles.skillsContainer}>
                                    {reel.aiSummary.recommendedSkills.map((skill, idx) => (
                                        <View key={idx} style={summaryStyles.skillChip}>
                                            <View
                                                style={[summaryStyles.skillChipGradient, { backgroundColor: Colors.surfaceElevated }]}
                                            >
                                                <Ionicons name="arrow-up-circle" size={14} color={Colors.primaryLight} />
                                                <Text style={summaryStyles.skillChipText}>{skill}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Difficulty & Duration */}
                            <View style={summaryStyles.metaRow}>
                                <View style={summaryStyles.metaChip}>
                                    <Ionicons name="speedometer" size={14} color={Colors.secondary} />
                                    <Text style={summaryStyles.metaText}>{reel.difficulty}</Text>
                                </View>
                                <View style={summaryStyles.metaChip}>
                                    <Ionicons name="time" size={14} color={Colors.secondary} />
                                    <Text style={summaryStyles.metaText}>{reel.duration}s</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

function ReelCard({ reel, isActive }: { reel: Reel; isActive: boolean }) {
    const [isLiked, setIsLiked] = useState(reel.isLiked);
    const [isSaved, setIsSaved] = useState(reel.isSaved);
    const [showAISummary, setShowAISummary] = useState(false);
    const [likeCount, setLikeCount] = useState(reel.likes);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();

    const handleLike = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, { toValue: 1.4, useNativeDriver: true, speed: 50 }),
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50 }),
        ]).start();
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this skill reel: ${reel.title} on SkillUp!`,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    return (
        <View style={[reelStyles.container, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT - TAB_BAR_HEIGHT }]}>
            {/* Background with solid color */}
            <View
                style={[StyleSheet.absoluteFill, { backgroundColor: reel.thumbnailColor || Colors.surface }]}
            />

            {/* Floating content overlay */}
            <View style={reelStyles.contentContainer}>
                {/* Centered video placeholder */}
                <View style={reelStyles.videoPlaceholder}>
                    <View
                        style={[reelStyles.playButtonBg, { backgroundColor: 'rgba(99,102,241,0.2)' }]}
                    >
                        <Ionicons name="play" size={48} color="rgba(255,255,255,0.9)" />
                    </View>
                    <Text style={reelStyles.durationBadge}>{reel.duration}s</Text>
                </View>
            </View>

            {/* Bottom info */}
            <View style={reelStyles.bottomGradient}>
                <View style={reelStyles.bottomContent}>
                    {/* Creator info */}
                    <View style={reelStyles.creatorRow}>
                        <View style={reelStyles.avatarContainer}>
                            <View
                                style={[reelStyles.avatarBorder, { backgroundColor: Colors.primary }]}
                            >
                                <View style={reelStyles.avatarInner}>
                                    <Text style={reelStyles.avatarText}>
                                        {reel.creatorName.charAt(0)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={reelStyles.creatorName}>{reel.creatorName}</Text>
                            <Text style={reelStyles.creatorUsername}>@{reel.creatorUsername}</Text>
                        </View>
                        <TouchableOpacity style={reelStyles.followBtn}>
                            <View
                                style={[reelStyles.followGradient, { backgroundColor: Colors.primary }]}
                            >
                                <Text style={reelStyles.followText}>Follow</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Title & description */}
                    <Text style={reelStyles.title} numberOfLines={2}>{reel.title}</Text>
                    <Text style={reelStyles.description} numberOfLines={2}>{reel.description}</Text>

                    {/* Tags */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={reelStyles.tagsRow}>
                        <View style={reelStyles.difficultyBadge}>
                            <Text style={reelStyles.difficultyText}>{reel.difficulty}</Text>
                        </View>
                        {reel.skillTags.map((tag, idx) => (
                            <View key={idx} style={reelStyles.tag}>
                                <Text style={reelStyles.tagText}>#{tag.replace(/\s/g, '')}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/* Right side action buttons */}
            <View style={reelStyles.actionsColumn}>
                {/* Like */}
                <TouchableOpacity style={reelStyles.actionBtn} onPress={handleLike}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <Ionicons
                            name={isLiked ? 'heart' : 'heart-outline'}
                            size={30}
                            color={isLiked ? Colors.like : '#fff'}
                        />
                    </Animated.View>
                    <Text style={reelStyles.actionCount}>{formatNumber(likeCount)}</Text>
                </TouchableOpacity>

                {/* Comment */}
                <TouchableOpacity
                    style={reelStyles.actionBtn}
                    onPress={() => router.push(`/reel/${reel.id}`)}
                >
                    <Ionicons name="chatbubble-outline" size={28} color="#fff" />
                    <Text style={reelStyles.actionCount}>{formatNumber(reel.comments)}</Text>
                </TouchableOpacity>

                {/* Save */}
                <TouchableOpacity style={reelStyles.actionBtn} onPress={handleShare} onPress={() => setIsSaved(!isSaved)}>
                    <Ionicons
                        name={isSaved ? 'bookmark' : 'bookmark-outline'}
                        size={28}
                        color={isSaved ? Colors.save : '#fff'}
                    />
                    <Text style={reelStyles.actionCount}>Save</Text>
                </TouchableOpacity>

                {/* Share */}
                <TouchableOpacity style={reelStyles.actionBtn}>
                    <Ionicons name="share-social-outline" size={28} color="#fff" />
                    <Text style={reelStyles.actionCount}>{formatNumber(reel.shares)}</Text>
                </TouchableOpacity>

                {/* AI Summary */}
                <TouchableOpacity
                    style={[reelStyles.actionBtn, reelStyles.aiBtn]}
                    onPress={() => setShowAISummary(true)}
                >
                    <View
                        style={[reelStyles.aiBtnGradient, { backgroundColor: Colors.surfaceElevated }]}
                    >
                        <Ionicons name="sparkles" size={20} color="#fff" />
                    </View>
                    <Text style={[reelStyles.actionCount, { color: Colors.primaryLight }]}>AI</Text>
                </TouchableOpacity>
            </View>

            {/* AI Summary Modal */}
            <AISummaryModal
                reel={reel}
                visible={showAISummary}
                onClose={() => setShowAISummary(false)}
            />
        </View>
    );
}

export default function HomeScreen() {
    const [activeIndex, setActiveIndex] = useState(0);

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            {/* Header overlay */}
            <View style={styles.header}>
                <Text style={styles.logo}>SkillUp</Text>
                <View style={styles.headerTabs}>
                    <Text style={[styles.headerTab, styles.headerTabActive]}>For You</Text>
                    <Text style={styles.headerTab}>Following</Text>
                    <Text style={styles.headerTab}>Trending</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={REELS}
                renderItem={({ item, index }) => (
                    <ReelCard reel={item} isActive={index === activeIndex} />
                )}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT - TAB_BAR_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(_, index) => ({
                    length: SCREEN_HEIGHT - TAB_BAR_HEIGHT,
                    offset: (SCREEN_HEIGHT - TAB_BAR_HEIGHT) * index,
                    index,
                })}
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.md,
    },
    logo: {
        fontSize: FontSize.xl,
        fontWeight: '800',
        color: Colors.primaryLight,
        letterSpacing: -0.5,
    },
    headerTabs: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    headerTab: {
        fontSize: FontSize.md,
        color: Colors.textTertiary,
        fontWeight: '500',
    },
    headerTabActive: {
        color: '#fff',
        fontWeight: '700',
    },
});

const reelStyles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButtonBg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationBadge: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: Spacing.sm,
        opacity: 0.7,
    },
    bottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 70,
        paddingBottom: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        paddingTop: 80,
    },
    bottomContent: {
        gap: Spacing.sm,
    },
    creatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.xs,
    },
    avatarContainer: {},
    avatarBorder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInner: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    creatorName: {
        color: '#fff',
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    creatorUsername: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
    followBtn: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    followGradient: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.full,
    },
    followText: {
        color: '#fff',
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    title: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '800',
        lineHeight: 24,
    },
    description: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        lineHeight: 18,
    },
    tagsRow: {
        flexDirection: 'row',
        marginTop: Spacing.xs,
    },
    difficultyBadge: {
        backgroundColor: Colors.primary + '30',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
        marginRight: Spacing.sm,
    },
    difficultyText: {
        color: Colors.primaryLight,
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    tag: {
        marginRight: Spacing.sm,
    },
    tagText: {
        color: Colors.secondary,
        fontSize: FontSize.xs,
        fontWeight: '600',
    },
    actionsColumn: {
        position: 'absolute',
        right: Spacing.md,
        bottom: Spacing.xxl,
        alignItems: 'center',
        gap: Spacing.xl,
    },
    actionBtn: {
        alignItems: 'center',
        gap: 2,
    },
    actionCount: {
        color: '#fff',
        fontSize: FontSize.xs,
        fontWeight: '600',
    },
    aiBtn: {
        marginTop: Spacing.sm,
    },
    aiBtnGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const summaryStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    container: {
        maxHeight: SCREEN_HEIGHT * 0.7,
        borderTopLeftRadius: BorderRadius.xxl,
        borderTopRightRadius: BorderRadius.xxl,
        overflow: 'hidden',
    },
    gradient: {
        padding: Spacing.xxl,
        paddingBottom: Spacing.huge,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    aiIconBg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '800',
    },
    closeBtn: {
        padding: Spacing.xs,
    },
    reelTitle: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
        marginBottom: Spacing.lg,
        lineHeight: 22,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.md,
    },
    insightRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
        gap: Spacing.md,
    },
    bulletDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: 6,
    },
    insightText: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        lineHeight: 20,
        flex: 1,
    },
    takeawayCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginBottom: Spacing.xl,
    },
    takeawayGradient: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.primary + '30',
    },
    takeawayLabel: {
        color: Colors.primaryLight,
        fontSize: FontSize.xs,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.xs,
    },
    takeawayText: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        lineHeight: 20,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    skillChip: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    skillChipGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        gap: Spacing.xs,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.primary + '30',
    },
    skillChipText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    metaRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    metaChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    metaText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
    },
});
