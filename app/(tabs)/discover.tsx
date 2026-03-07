import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import {
    TRENDING_SKILLS,
    GROWING_INDUSTRIES,
    REELS,
    INTEREST_CATEGORIES,
} from '../../constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function TrendingSkillCard({ skill }: { skill: typeof TRENDING_SKILLS[0] }) {
    return (
        <TouchableOpacity style={styles.skillCard}>
            <View
                style={[styles.skillCardGradient, { backgroundColor: skill.color + '15' }]}
            >
                <View style={[styles.skillIconBg, { backgroundColor: skill.color + '30' }]}>
                    <Ionicons name={skill.icon as any} size={22} color={skill.color} />
                </View>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.growthBadge}>
                    <Ionicons name="trending-up" size={12} color={Colors.success} />
                    <Text style={styles.growthText}>{skill.growth}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function IndustryCard({ industry }: { industry: typeof GROWING_INDUSTRIES[0] }) {
    return (
        <TouchableOpacity style={styles.industryCard}>
            <View
                style={[styles.industryGradient, { backgroundColor: Colors.surface }]}
            >
                <View style={[styles.industryIcon, { backgroundColor: industry.color + '25' }]}>
                    <Ionicons name={industry.icon as any} size={24} color={industry.color} />
                </View>
                <View style={styles.industryInfo}>
                    <Text style={styles.industryName}>{industry.name}</Text>
                    <Text style={styles.industryDesc}>{industry.description}</Text>
                </View>
                <View style={styles.industryGrowthBadge}>
                    <Text style={[styles.industryGrowthText, { color: industry.color }]}>{industry.growth}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function ReelPreviewCard({ reel }: { reel: typeof REELS[0] }) {
    return (
        <TouchableOpacity style={styles.reelPreview}>
            <View
                style={[styles.reelPreviewGradient, { backgroundColor: Colors.surface }]}
            >
                <View style={styles.reelPreviewPlay}>
                    <Ionicons name="play" size={20} color="#fff" />
                </View>
                <View style={styles.reelPreviewInfo}>
                    <Text style={styles.reelPreviewTitle} numberOfLines={2}>{reel.title}</Text>
                    <Text style={styles.reelPreviewCreator}>{reel.creatorName}</Text>
                    <View style={styles.reelPreviewStats}>
                        <Ionicons name="eye" size={10} color={Colors.textTertiary} />
                        <Text style={styles.reelPreviewStatText}>{(reel.views / 1000).toFixed(0)}K</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default function DiscoverScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Discover</Text>
                    <Text style={styles.headerSubtitle}>Explore skills & industries</Text>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <View
                        style={[styles.searchGradient, { backgroundColor: Colors.surfaceLight }]}
                    >
                        <Ionicons name="search" size={20} color={Colors.textTertiary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search skills, topics, creators..."
                            placeholderTextColor={Colors.textTertiary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity style={styles.filterBtn}>
                            <Ionicons name="options" size={20} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Category chips */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
                    <TouchableOpacity
                        style={[styles.categoryChip, activeCategory === 'all' && styles.categoryChipActive]}
                        onPress={() => setActiveCategory('all')}
                    >
                        <Text style={[styles.categoryChipText, activeCategory === 'all' && styles.categoryChipTextActive]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    {INTEREST_CATEGORIES.slice(0, 8).map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.categoryChip, activeCategory === cat.id && styles.categoryChipActive]}
                            onPress={() => setActiveCategory(cat.id)}
                        >
                            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                            <Text style={[styles.categoryChipText, activeCategory === cat.id && styles.categoryChipTextActive]}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* AI Career Insights Banner */}
                <TouchableOpacity style={styles.insightsBanner}>
                    <View
                        style={[styles.insightsBannerGradient, { backgroundColor: Colors.primaryDark }]}
                    >
                        <View>
                            <View style={styles.insightsBadge}>
                                <Ionicons name="sparkles" size={12} color="#fff" />
                                <Text style={styles.insightsBadgeText}>AI Powered</Text>
                            </View>
                            <Text style={styles.insightsBannerTitle}>Career Intelligence</Text>
                            <Text style={styles.insightsBannerDesc}>Get AI-powered career path recommendations</Text>
                        </View>
                        <Ionicons name="arrow-forward-circle" size={32} color="rgba(255,255,255,0.8)" />
                    </View>
                </TouchableOpacity>

                {/* Trending Skills */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🔥 Trending Skills This Week</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.skillsRow}>
                        {TRENDING_SKILLS.map((skill, idx) => (
                            <TrendingSkillCard key={idx} skill={skill} />
                        ))}
                    </ScrollView>
                </View>

                {/* Fast Growing Industries */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>📈 Fast Growing Industries</Text>
                    </View>
                    {GROWING_INDUSTRIES.map((industry, idx) => (
                        <IndustryCard key={idx} industry={industry} />
                    ))}
                </View>

                {/* Popular Reels */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>⚡ Popular Reels</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {REELS.slice(0, 6).map((reel) => (
                            <ReelPreviewCard key={reel.id} reel={reel} />
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    header: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
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
    searchContainer: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    searchGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: FontSize.md,
        marginLeft: Spacing.md,
        paddingVertical: 0,
    },
    filterBtn: {
        padding: Spacing.xs,
    },
    categoriesRow: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        marginRight: Spacing.sm,
        gap: Spacing.xs,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryChipActive: {
        backgroundColor: Colors.primary + '25',
        borderColor: Colors.primary + '50',
    },
    categoryEmoji: {
        fontSize: 14,
    },
    categoryChipText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    categoryChipTextActive: {
        color: Colors.primaryLight,
    },
    insightsBanner: {
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.xxl,
    },
    insightsBannerGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.xl,
    },
    insightsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.full,
        alignSelf: 'flex-start',
        gap: Spacing.xs,
        marginBottom: Spacing.sm,
    },
    insightsBadgeText: {
        color: '#fff',
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    insightsBannerTitle: {
        color: '#fff',
        fontSize: FontSize.xxl,
        fontWeight: '800',
    },
    insightsBannerDesc: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: FontSize.sm,
        marginTop: Spacing.xs,
    },
    section: {
        marginBottom: Spacing.xxl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '700',
    },
    seeAll: {
        color: Colors.primary,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    skillsRow: {
        paddingLeft: Spacing.xl,
    },
    skillCard: {
        width: 140,
        marginRight: Spacing.md,
    },
    skillCardGradient: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        gap: Spacing.md,
    },
    skillIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skillName: {
        color: '#fff',
        fontSize: FontSize.sm,
        fontWeight: '700',
        textAlign: 'center',
    },
    growthBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    growthText: {
        color: Colors.success,
        fontSize: FontSize.xs,
        fontWeight: '700',
    },
    industryCard: {
        marginHorizontal: Spacing.xl,
        marginBottom: Spacing.md,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    industryGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    industryIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    industryInfo: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    industryName: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    industryDesc: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    industryGrowthBadge: {
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    industryGrowthText: {
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    reelPreview: {
        width: 160,
        height: 220,
        marginLeft: Spacing.xl,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    reelPreviewGradient: {
        flex: 1,
        padding: Spacing.md,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
    },
    reelPreviewPlay: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reelPreviewInfo: {
        gap: Spacing.xs,
    },
    reelPreviewTitle: {
        color: '#fff',
        fontSize: FontSize.sm,
        fontWeight: '700',
        lineHeight: 16,
    },
    reelPreviewCreator: {
        color: Colors.textSecondary,
        fontSize: FontSize.xs,
    },
    reelPreviewStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    reelPreviewStatText: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
    },
});
