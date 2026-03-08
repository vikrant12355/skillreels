import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { INTEREST_CATEGORIES, CAREER_GOALS, SKILL_LEVELS } from '../constants/mockData';
import { loginUser, registerUser } from '../src/services/authService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(-1); // Start with Auth step
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');

    const toggleInterest = (id: string) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        setLoading(true);
        const { user, error } = isLogin 
            ? await loginUser(email, password)
            : await registerUser(email, password);
        
        setLoading(false);

        if (error) {
            Alert.alert('Auth Error', error);
        } else if (user) {
            setStep(0);
        }
    };

    const canProgress = () => {
        if (step === -1) return email.length > 0 && password.length > 5;
        if (step === 0) return selectedInterests.length >= 2;
        if (step === 1) return selectedGoal !== '';
        if (step === 2) return selectedLevel !== '';
        return true;
    };

    const handleNext = () => {
        if (step === -1) {
            handleAuth();
        } else if (step < 2) {
            setStep(step + 1);
        } else {
            router.replace('/(tabs)');
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={[StyleSheet.absoluteFill, { backgroundColor: Colors.background }]}
            />

            {/* Progress bar */}
            <View style={styles.progressBarContainer}>
                {[-1, 0, 1, 2].map((i) => (
                    <View
                        key={i}
                        style={[
                            styles.progressBarSegment,
                            i <= step && styles.progressBarActive,
                        ]}
                    >
                        {i <= step && (
                            <View
                                style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primary }]}
                            />
                        )}
                    </View>
                ))}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Step -1: Login / Register */}
                {step === -1 && (
                    <View style={styles.stepContainer}>
                        <View style={styles.stepHeader}>
                            <Text style={styles.stepEmoji}>{isLogin ? '👋' : '✨'}</Text>
                            <Text style={styles.stepTitle}>{isLogin ? 'Welcome Back!' : 'Create Account'}</Text>
                            <Text style={styles.stepSubtitle}>
                                {isLogin ? 'Sign in to continue your learning journey' : 'Join SkillUp Reels and start learning today'}
                            </Text>
                        </View>

                        <View style={styles.authForm}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor={Colors.textTertiary}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={Colors.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />

                            <TouchableOpacity 
                                style={styles.toggleAuth} 
                                onPress={() => setIsLogin(!isLogin)}
                            >
                                <Text style={styles.toggleAuthText}>
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Step 0: Interests */}
                {step === 0 && (
                    <View style={styles.stepContainer}>
                        <View style={styles.stepHeader}>
                            <Text style={styles.stepEmoji}>🎯</Text>
                            <Text style={styles.stepTitle}>What interests you?</Text>
                            <Text style={styles.stepSubtitle}>Select at least 2 topics you want to learn about</Text>
                        </View>
                        <View style={styles.grid}>
                            {INTEREST_CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[
                                        styles.interestCard,
                                        selectedInterests.includes(cat.id) && styles.interestCardActive,
                                    ]}
                                    onPress={() => toggleInterest(cat.id)}
                                >
                                    {selectedInterests.includes(cat.id) ? (
                                        <View
                                            style={[styles.interestGradient, { backgroundColor: Colors.primary + '20', borderWidth: 1, borderColor: Colors.primary + '60' }]}
                                        >
                                            <Text style={styles.interestEmoji}>{cat.emoji}</Text>
                                            <Text style={[styles.interestName, { color: Colors.primaryLight }]}>{cat.name}</Text>
                                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkmark} />
                                        </View>
                                    ) : (
                                        <View style={styles.interestGradient}>
                                            <Text style={styles.interestEmoji}>{cat.emoji}</Text>
                                            <Text style={styles.interestName}>{cat.name}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Step 1: Career Goals */}
                {step === 1 && (
                    <View style={styles.stepContainer}>
                        <View style={styles.stepHeader}>
                            <Text style={styles.stepEmoji}>🚀</Text>
                            <Text style={styles.stepTitle}>What's your goal?</Text>
                            <Text style={styles.stepSubtitle}>This helps us personalize your learning feed</Text>
                        </View>
                        <View style={styles.goalsList}>
                            {CAREER_GOALS.map((goal) => (
                                <TouchableOpacity
                                    key={goal.id}
                                    style={[
                                        styles.goalCard,
                                        selectedGoal === goal.id && styles.goalCardActive,
                                    ]}
                                    onPress={() => setSelectedGoal(goal.id)}
                                >
                                    {selectedGoal === goal.id ? (
                                        <View
                                            style={[styles.goalGradient, { backgroundColor: Colors.primary + '20' }]}
                                        >
                                            <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                                            <Text style={[styles.goalName, { color: Colors.primaryLight }]}>{goal.name}</Text>
                                            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                                        </View>
                                    ) : (
                                        <View style={styles.goalGradient}>
                                            <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                                            <Text style={styles.goalName}>{goal.name}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Step 2: Skill Level */}
                {step === 2 && (
                    <View style={styles.stepContainer}>
                        <View style={styles.stepHeader}>
                            <Text style={styles.stepEmoji}>📊</Text>
                            <Text style={styles.stepTitle}>Your experience level</Text>
                            <Text style={styles.stepSubtitle}>We'll adjust content difficulty for you</Text>
                        </View>
                        <View style={styles.levelsList}>
                            {SKILL_LEVELS.map((level) => (
                                <TouchableOpacity
                                    key={level.id}
                                    style={[
                                        styles.levelCard,
                                        selectedLevel === level.id && styles.levelCardActive,
                                    ]}
                                    onPress={() => setSelectedLevel(level.id)}
                                >
                                    {selectedLevel === level.id ? (
                                        <View
                                            style={[styles.levelGradient, { backgroundColor: Colors.primary + '20' }]}
                                        >
                                            <Text style={styles.levelEmoji}>{level.emoji}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.levelName, { color: Colors.primaryLight }]}>{level.name}</Text>
                                                <Text style={styles.levelDesc}>{level.description}</Text>
                                            </View>
                                            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                                        </View>
                                    ) : (
                                        <View style={styles.levelGradient}>
                                            <Text style={styles.levelEmoji}>{level.emoji}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.levelName}>{level.name}</Text>
                                                <Text style={styles.levelDesc}>{level.description}</Text>
                                            </View>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom navigation */}
            <View style={styles.bottomBar}>
                {step > 0 && (
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}>
                        <Ionicons name="arrow-back" size={20} color={Colors.textSecondary} />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.nextBtn, !canProgress() && styles.nextBtnDisabled]}
                    onPress={handleNext}
                    disabled={!canProgress()}
                >
                    <View
                        style={[styles.nextGradient, { backgroundColor: canProgress() ? Colors.primary : Colors.surfaceLight }]}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Text style={[styles.nextText, !canProgress() && { color: Colors.textTertiary }]}>
                                    {step === -1 ? (isLogin ? 'Log In' : 'Sign Up') : (step === 2 ? 'Start Learning' : 'Continue')}
                                </Text>
                                <Ionicons
                                    name={step === 2 ? 'rocket' : 'arrow-forward'}
                                    size={20}
                                    color={canProgress() ? '#fff' : Colors.textTertiary}
                                />
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    progressBarContainer: {
        flexDirection: 'row',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.xl,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    progressBarSegment: {
        flex: 1,
        height: 4,
        backgroundColor: Colors.surfaceLight,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarActive: {},
    scrollContent: {
        paddingBottom: 120,
    },
    stepContainer: {
        paddingHorizontal: Spacing.xl,
    },
    authForm: {
        marginTop: Spacing.xl,
        gap: Spacing.md,
    },
    input: {
        backgroundColor: Colors.surfaceElevated,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        color: Colors.text,
        fontSize: FontSize.md,
    },
    toggleAuth: {
        padding: Spacing.sm,
        alignItems: 'center',
    },
    toggleAuthText: {
        color: Colors.primary,
        fontSize: FontSize.sm,
        fontWeight: '600',
    },
    stepHeader: {
        alignItems: 'center',
        marginTop: Spacing.xxxl,
        marginBottom: Spacing.xxxl,
    },
    stepEmoji: {
        fontSize: 48,
        marginBottom: Spacing.lg,
    },
    stepTitle: {
        color: '#fff',
        fontSize: FontSize.xxxl,
        fontWeight: '800',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    stepSubtitle: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    interestCard: {
        width: (SCREEN_WIDTH - Spacing.xl * 2 - Spacing.md) / 2,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    interestCardActive: {},
    interestGradient: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'relative',
    },
    interestEmoji: {
        fontSize: 32,
        marginBottom: Spacing.sm,
    },
    interestName: {
        color: Colors.textSecondary,
        fontSize: FontSize.sm,
        fontWeight: '600',
        textAlign: 'center',
    },
    checkmark: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    goalsList: {
        gap: Spacing.md,
    },
    goalCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    goalCardActive: {},
    goalGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    goalEmoji: {
        fontSize: 28,
    },
    goalName: {
        color: Colors.textSecondary,
        fontSize: FontSize.lg,
        fontWeight: '700',
        flex: 1,
    },
    levelsList: {
        gap: Spacing.md,
    },
    levelCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
    },
    levelCardActive: {},
    levelGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.lg,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    levelEmoji: {
        fontSize: 28,
    },
    levelName: {
        color: Colors.textSecondary,
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
    levelDesc: {
        color: Colors.textTertiary,
        fontSize: FontSize.sm,
        marginTop: 2,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.xl,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        paddingTop: Spacing.lg,
        backgroundColor: Colors.background + 'EE',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    backText: {
        color: Colors.textSecondary,
        fontSize: FontSize.md,
        fontWeight: '600',
    },
    nextBtn: {
        flex: 1,
        maxWidth: 220,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginLeft: 'auto',
    },
    nextBtnDisabled: {},
    nextGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.xl,
    },
    nextText: {
        color: '#fff',
        fontSize: FontSize.lg,
        fontWeight: '700',
    },
});
