import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/theme';
import { INTEREST_CATEGORIES } from '../../constants/mockData';

const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function CreateScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState('Beginner');
    const [showAITags, setShowAITags] = useState(false);

    const aiSuggestedTags = ['AI Agents', 'LLM Engineering', 'Machine Learning', 'Automation', 'Future Skills'];

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleAutoTag = () => {
        setShowAITags(true);
        // Simulate AI generating tags
        setTimeout(() => {
            setSelectedTags(['AI', 'Machine Learning', 'Future Skills']);
        }, 500);
    };

    const handlePublish = () => {
        Alert.alert(
            '🎉 Reel Published!',
            'Your reel has been published and AI is now generating captions and skill tags.',
            [{ text: 'Great!' }]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create Reel</Text>
                    <Text style={styles.headerSubtitle}>Share professional knowledge</Text>
                </View>

                {/* Video Upload Area */}
                <TouchableOpacity style={styles.uploadArea}>
                    <View
                        style={[styles.uploadGradient, { backgroundColor: Colors.surface }]}
                    >
                        <View style={styles.uploadIconContainer}>
                            <View
                                style={[styles.uploadIconBg, { backgroundColor: Colors.primary }]}
                            >
                                <Ionicons name="videocam" size={32} color="#fff" />
                            </View>
                        </View>
                        <Text style={styles.uploadTitle}>Upload Video</Text>
                        <Text style={styles.uploadSubtitle}>Tap to select from gallery</Text>
                        <View style={styles.uploadSpecs}>
                            <View style={styles.specChip}>
                                <Ionicons name="time" size={12} color={Colors.textTertiary} />
                                <Text style={styles.specText}>15-60 seconds</Text>
                            </View>
                            <View style={styles.specChip}>
                                <Ionicons name="phone-portrait" size={12} color={Colors.textTertiary} />
                                <Text style={styles.specText}>Vertical 9:16</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Title */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Top 5 AI Tools for 2026"
                            placeholderTextColor={Colors.textTertiary}
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                        <Text style={styles.charCount}>{title.length}/100</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <View style={[styles.inputContainer, styles.textAreaContainer]}>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe what viewers will learn..."
                            placeholderTextColor={Colors.textTertiary}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            maxLength={500}
                        />
                        <Text style={styles.charCount}>{description.length}/500</Text>
                    </View>
                </View>

                {/* Difficulty Level */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Difficulty Level</Text>
                    <View style={styles.difficultyRow}>
                        {DIFFICULTY_LEVELS.map((level) => (
                            <TouchableOpacity
                                key={level}
                                style={[
                                    styles.difficultyChip,
                                    difficulty === level && styles.difficultyActive,
                                ]}
                                onPress={() => setDifficulty(level)}
                            >
                                {difficulty === level ? (
                                    <View
                                        style={[styles.difficultyGradient, { backgroundColor: Colors.primary }]}
                                    >
                                        <Text style={styles.difficultyTextActive}>{level}</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.difficultyText}>{level}</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Skill Tags */}
                <View style={styles.inputGroup}>
                    <View style={styles.tagHeader}>
                        <Text style={styles.inputLabel}>Skill Tags</Text>
                        <TouchableOpacity style={styles.aiTagBtn} onPress={handleAutoTag}>
                            <View
                                style={[styles.aiTagGradient, { backgroundColor: Colors.primary + '20' }]}
                            >
                                <Ionicons name="sparkles" size={14} color={Colors.primaryLight} />
                                <Text style={styles.aiTagText}>AI Auto-Tag</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tagsContainer}>
                        {INTEREST_CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.tagChip,
                                    selectedTags.includes(cat.name) && styles.tagChipActive,
                                ]}
                                onPress={() => toggleTag(cat.name)}
                            >
                                <Text style={styles.tagEmoji}>{cat.emoji}</Text>
                                <Text style={[
                                    styles.tagText,
                                    selectedTags.includes(cat.name) && styles.tagTextActive,
                                ]}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* AI Suggested Tags */}
                    {showAITags && (
                        <View style={styles.aiSuggestions}>
                            <View style={styles.aiSuggestionsHeader}>
                                <Ionicons name="sparkles" size={14} color={Colors.accent} />
                                <Text style={styles.aiSuggestionsTitle}>AI Suggested</Text>
                            </View>
                            <View style={styles.tagsContainer}>
                                {aiSuggestedTags.map((tag) => (
                                    <TouchableOpacity
                                        key={tag}
                                        style={styles.aiSuggestedChip}
                                        onPress={() => toggleTag(tag)}
                                    >
                                        <Text style={styles.aiSuggestedText}>+ {tag}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* AI Features Info */}
                <View style={styles.aiInfoCard}>
                    <View
                        style={[styles.aiInfoGradient, { backgroundColor: Colors.surfaceLight }]}
                    >
                        <View style={styles.aiInfoHeader}>
                            <Ionicons name="sparkles" size={18} color={Colors.primaryLight} />
                            <Text style={styles.aiInfoTitle}>AI Will Auto-Generate</Text>
                        </View>
                        <View style={styles.aiInfoItems}>
                            <View style={styles.aiInfoItem}>
                                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                <Text style={styles.aiInfoText}>Captions & subtitles</Text>
                            </View>
                            <View style={styles.aiInfoItem}>
                                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                <Text style={styles.aiInfoText}>Full transcript</Text>
                            </View>
                            <View style={styles.aiInfoItem}>
                                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                <Text style={styles.aiInfoText}>Key insights & takeaways</Text>
                            </View>
                            <View style={styles.aiInfoItem}>
                                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                                <Text style={styles.aiInfoText}>Skill mapping & difficulty</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Publish Button */}
                <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
                    <View
                        style={[styles.publishGradient, { backgroundColor: Colors.primary }]}
                    >
                        <Ionicons name="rocket" size={20} color="#fff" />
                        <Text style={styles.publishText}>Publish Reel</Text>
                    </View>
                </TouchableOpacity>

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
        marginBottom: Spacing.xxl,
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
    uploadArea: {
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.xxl,
    },
    uploadGradient: {
        alignItems: 'center',
        paddingVertical: Spacing.huge,
        borderRadius: BorderRadius.xl,
        borderWidth: 2,
        borderColor: Colors.primary + '30',
        borderStyle: 'dashed',
    },
    uploadIconContainer: {
        marginBottom: Spacing.lg,
    },
    uploadIconBg: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadTitle: {
        color: '#fff',
        fontSize: FontSize.xl,
        fontWeight: '700',
        marginBottom: Spacing.xs,
    },
    uploadSubtitle: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        marginBottom: Spacing.lg,
    },
    uploadSpecs: {
        flexDirection: 'row',
        gap: Spacing.lg,
    },
    specChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    specText: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
    },
    inputGroup: {
        paddingHorizontal: Spacing.xl,
        marginBottom: Spacing.xl,
    },
    inputLabel: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.md,
    },
    inputContainer: {
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    input: {
        color: '#fff',
        fontSize: FontSize.md,
        paddingVertical: 0,
    },
    textAreaContainer: {
        minHeight: 100,
    },
    textArea: {
        textAlignVertical: 'top',
        height: 80,
    },
    charCount: {
        color: Colors.textTertiary,
        fontSize: FontSize.xs,
        textAlign: 'right',
        marginTop: Spacing.xs,
    },
    difficultyRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    difficultyChip: {
        flex: 1,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    difficultyActive: {
        borderColor: 'transparent',
    },
    difficultyGradient: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
        borderRadius: BorderRadius.lg,
    },
    difficultyText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: Spacing.md,
    },
    difficultyTextActive: {
        color: '#fff',
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    tagHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    aiTagBtn: {
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    aiTagGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.full,
        gap: Spacing.xs,
    },
    aiTagText: {
        color: Colors.primaryLight,
        fontSize: FontSize.sm,
        fontWeight: '700',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    tagChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.surfaceLight,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    tagChipActive: {
        backgroundColor: Colors.primary + '25',
        borderColor: Colors.primary + '50',
    },
    tagEmoji: {
        fontSize: 14,
    },
    tagText: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    tagTextActive: {
        color: Colors.primaryLight,
    },
    aiSuggestions: {
        marginTop: Spacing.lg,
        backgroundColor: Colors.accent + '08',
        padding: Spacing.md,
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
    aiSuggestedChip: {
        backgroundColor: Colors.accent + '20',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs + 2,
        borderRadius: BorderRadius.full,
    },
    aiSuggestedText: {
        color: Colors.accentLight,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    aiInfoCard: {
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginBottom: Spacing.xxl,
    },
    aiInfoGradient: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.primary + '20',
    },
    aiInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
    },
    aiInfoTitle: {
        color: Colors.primaryLight,
        fontSize: FontSize.md,
        fontWeight: '700',
    },
    aiInfoItems: {
        gap: Spacing.sm,
    },
    aiInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    aiInfoText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
    },
    publishBtn: {
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
    },
    publishGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.lg,
        gap: Spacing.md,
        borderRadius: BorderRadius.xl,
    },
    publishText: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '800',
    },
});
