import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Dimensions,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { CURRENT_USER, SKILL_TREE, PLAYLISTS, REELS, SkillNode } from '../../constants/mockData';
import { logoutUser } from '../../src/services/authService';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SKILL_COLORS = ['#6366F1', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

function SkillTreeItem({ node, depth = 0, colorIdx = 0 }: { node: SkillNode; depth?: number; colorIdx?: number }) {
    const color = SKILL_COLORS[colorIdx % SKILL_COLORS.length];
    const levelPercentage = (node.level / 5) * 100;

    return (
        <View style={{ marginLeft: depth * 20 }}>
            <View style={skillStyles.skillItem}>
                <View style={[skillStyles.skillDot, { backgroundColor: color }]} />
                <Text style={skillStyles.skillName}>{node.name}</Text>
                <View style={skillStyles.progressBg}>
                    <View style={[skillStyles.progressFill, { width: `${levelPercentage}%`, backgroundColor: color }]} />
                </View>
                <Text style={[skillStyles.skillLevel, { color }]}>Lv.{node.level}</Text>
            </View>
            {node.children?.map((child, idx) => (
                <SkillTreeItem key={idx} node={child} depth={depth + 1} colorIdx={colorIdx} />
            ))}
        </View>
    );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
    return (
        <View style={profileStyles.statItem}>
            <Text style={profileStyles.statValue}>{typeof value === 'number' ? formatNumber(value) : value}</Text>
            <Text style={profileStyles.statLabel}>{label}</Text>
        </View>
    );
}

function formatNumber(num: number): string {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

export default function ProfileScreen() {
    const [activeTab, setActiveTab] = useState<'skills' | 'saved' | 'reels'>('skills');
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await logoutUser();
        if (error) {
            Alert.alert('Logout Error', error);
        } else {
            router.replace('/onboarding');
        }
    };

    const savedReels = REELS.filter(r => PLAYLISTS.some(p => p.reelIds.includes(r.id)));

    return (
        <View style={profileStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={profileStyles.scrollContent}>
                {/* Header */}
                <View style={profileStyles.header}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={24} color={Colors.error || '#EF4444'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: Spacing.md }}>
                        <Ionicons name="settings-outline" size={24} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                {/* Profile Card */}
                <View style={profileStyles.profileCard}>
                    <View
                        style={[profileStyles.profileGradient, { backgroundColor: Colors.surfaceElevated }]}
                    >
                        {/* Avatar */}
                        <View style={profileStyles.avatarContainer}>
                            <View
                                style={[profileStyles.avatarBorder, { backgroundColor: Colors.primary }]}
                            >
                                <View style={profileStyles.avatarInner}>
                                    <Text style={profileStyles.avatarText}>Y</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={profileStyles.name}>{CURRENT_USER.name}</Text>
                        <Text style={profileStyles.username}>@{CURRENT_USER.username}</Text>
                        <Text style={profileStyles.bio}>{CURRENT_USER.bio}</Text>

                        {/* Stats */}
                        <View style={profileStyles.statsRow}>
                            <StatItem value={CURRENT_USER.followers} label="Followers" />
                            <View style={profileStyles.statDivider} />
                            <StatItem value={CURRENT_USER.following} label="Following" />
                            <View style={profileStyles.statDivider} />
                            <StatItem value={CURRENT_USER.reelsCount} label="Reels" />
                        </View>

                        {/* Edit Profile */}
                        <TouchableOpacity style={profileStyles.editBtn}>
                            <Text style={profileStyles.editBtnText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tab Switcher */}
                <View style={profileStyles.tabRow}>
                    {(['skills', 'saved', 'reels'] as const).map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[profileStyles.tab, activeTab === tab && profileStyles.tabActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Ionicons
                                name={
                                    tab === 'skills' ? 'analytics' :
                                        tab === 'saved' ? 'bookmark' : 'play-circle'
                                }
                                size={18}
                                color={activeTab === tab ? Colors.primary : Colors.textTertiary}
                            />
                            <Text style={[
                                profileStyles.tabText,
                                activeTab === tab && profileStyles.tabTextActive,
                            ]}>
                                {tab === 'skills' ? 'Skills' : tab === 'saved' ? 'Saved' : 'My Reels'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                {activeTab === 'skills' && (
                    <View style={profileStyles.tabContent}>
                        {/* Learning Progress */}
                        <View style={profileStyles.progressCard}>
                            <View
                                style={[profileStyles.progressGradient, { backgroundColor: Colors.surfaceLight }]}
                            >
                                <View style={profileStyles.progressHeader}>
                                    <Ionicons name="trending-up" size={20} color={Colors.success} />
                                    <Text style={profileStyles.progressTitle}>Learning Progress</Text>
                                </View>
                                <View style={profileStyles.progressStats}>
                                    <View style={profileStyles.progressStatItem}>
                                        <Text style={profileStyles.progressStatValue}>47</Text>
                                        <Text style={profileStyles.progressStatLabel}>Reels Watched</Text>
                                    </View>
                                    <View style={profileStyles.progressStatItem}>
                                        <Text style={profileStyles.progressStatValue}>12</Text>
                                        <Text style={profileStyles.progressStatLabel}>Skills Tracked</Text>
                                    </View>
                                    <View style={profileStyles.progressStatItem}>
                                        <Text style={profileStyles.progressStatValue}>5h</Text>
                                        <Text style={profileStyles.progressStatLabel}>Learning Time</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Skill Tree */}
                        <Text style={profileStyles.sectionTitle}>Skill Graph</Text>
                        {SKILL_TREE.map((node, idx) => (
                            <SkillTreeItem key={idx} node={node} colorIdx={idx} />
                        ))}
                    </View>
                )}

                {activeTab === 'saved' && (
                    <View style={profileStyles.tabContent}>
                        {/* Playlists */}
                        {PLAYLISTS.map((playlist) => (
                            <TouchableOpacity key={playlist.id} style={profileStyles.playlistCard}>
                                <View
                                    style={[profileStyles.playlistGradient, { backgroundColor: Colors.surfaceLight }]}
                                >
                                    <Text style={profileStyles.playlistEmoji}>{playlist.emoji}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={profileStyles.playlistName}>{playlist.name}</Text>
                                        <Text style={profileStyles.playlistCount}>{playlist.reelIds.length} reels</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {activeTab === 'reels' && (
                    <View style={profileStyles.tabContent}>
                        <View style={profileStyles.reelsGrid}>
                            {REELS.slice(0, 4).map((reel) => (
                                <TouchableOpacity key={reel.id} style={profileStyles.myReelCard}>
                                    <View
                                        style={[profileStyles.myReelGradient, { backgroundColor: Colors.surfaceLight }]}
                                    >
                                        <Ionicons name="play" size={24} color="rgba(255,255,255,0.7)" />
                                        <Text style={profileStyles.myReelTitle} numberOfLines={2}>{reel.title}</Text>
                                        <View style={profileStyles.myReelStats}>
                                            <Ionicons name="eye" size={10} color={Colors.textTertiary} />
                                            <Text style={profileStyles.myReelStatText}>{(reel.views / 1000).toFixed(0)}K</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.md,
    },
    profileCard: {
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.xxl,
    },
    profileGradient: {
        alignItems: 'center',
        padding: Spacing.xxl,
        borderRadius: BorderRadius.xl,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarContainer: {
        marginBottom: Spacing.lg,
    },
    avatarBorder: {
        width: 88,
        height: 88,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInner: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: FontSize.hero,
        fontWeight: '800',
    },
    name: {
        color: '#fff',
        fontSize: FontSize.xxl,
        fontWeight: '800',
    },
    username: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        marginTop: Spacing.xs,
    },
    bio: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        textAlign: 'center',
        marginTop: Spacing.md,
        lineHeight: 20,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.xl,
        gap: Spacing.xl,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        color: '#fff',
        fontSize: FontSize.xxl,
        fontWeight: '800',
    },
    statLabel: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: Colors.border,
    },
    editBtn: {
        marginTop: Spacing.xl,
        borderWidth: 1,
        borderColor: Colors.primary + '50',
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.xxl,
        paddingVertical: Spacing.sm,
    },
    editBtnText: {
        color: Colors.primaryLight,
        fontSize: FontSize.md,
        fontWeight: '600',
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
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    tabTextActive: {
        color: Colors.primaryLight,
    },
    tabContent: {
        paddingHorizontal: Spacing.xl,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '700',
        marginBottom: Spacing.lg,
        marginTop: Spacing.lg,
    },
    progressCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    progressGradient: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    progressTitle: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    progressStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    progressStatItem: {
        alignItems: 'center',
    },
    progressStatValue: {
        color: Colors.primaryLight,
        fontSize: FontSize.xxl,
        fontWeight: '800',
    },
    progressStatLabel: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        marginTop: 2,
    },
    playlistCard: {
        marginBottom: Spacing.md,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    playlistGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        gap: Spacing.md,
    },
    playlistEmoji: {
        fontSize: 28,
    },
    playlistName: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    playlistCount: {
        color: Colors.textTertiary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    reelsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    myReelCard: {
        width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.md) / 2,
        height: 180,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    myReelGradient: {
        flex: 1,
        padding: Spacing.md,
        justifyContent: 'space-between',
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    myReelTitle: {
        color: '#fff',
        fontSize: FontSize.sm,
        fontWeight: '700',
        lineHeight: 16,
    },
    myReelStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    myReelStatText: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
    },
});

const skillStyles = StyleSheet.create({
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    skillDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    skillName: {
        color: Colors.textPrimary,
        fontSize: FontSize.md,
        fontWeight: '600',
        width: 120,
    },
    progressBg: {
        flex: 1,
        height: 6,
        backgroundColor: Colors.surfaceLight,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
    skillLevel: {
        fontSize: FontSize.xs,
        fontWeight: '700',
        width: 30,
        textAlign: 'right',
    },
});
