import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={styles.successContainer}>
      <View style={styles.contentRow}>
        <View style={styles.contentLeft}>
          <View style={[styles.iconCircle, styles.successIconCircle]}>
            <Text style={styles.successCheckmark}>✓</Text>
          </View>
          
          <View style={styles.textContainer}>
            {text1 && (
              <Text style={[styles.title, styles.successText]}>
                {text1}
              </Text>
            )}
            {text2 && (
              <Text style={[styles.subtitle, styles.successText]}>
                {text2}
              </Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => Toast.hide()}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeIcon, styles.successText]}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),

  error: ({ text1, text2 }: CustomToastProps) => (
    <View style={styles.errorContainer}>
      <View style={styles.contentRow}>
        <View style={styles.contentLeft}>
          <View style={[styles.iconCircle, styles.errorIconCircle]}>
            <Text style={styles.errorExclamation}>!</Text>
          </View>
          
          <View style={styles.textContainer}>
            {text1 && (
              <Text style={[styles.title, styles.errorText]}>
                {text1}
              </Text>
            )}
            {text2 && (
              <Text style={[styles.subtitle, styles.errorText]}>
                {text2}
              </Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => Toast.hide()}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeIcon, styles.errorText]}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),

  warning: ({ text1, text2 }: CustomToastProps) => (
    <View style={styles.warningContainer}>
      <View style={styles.contentRow}>
        <View style={styles.contentLeft}>
          <View style={[styles.iconCircle, styles.warningIconCircle]}>
            <Text style={styles.warningExclamation}>!</Text>
          </View>
          
          <View style={styles.textContainer}>
            {text1 && (
              <Text style={[styles.title, styles.warningText]}>
                {text1}
              </Text>
            )}
            {text2 && (
              <Text style={[styles.subtitle, styles.warningText]}>
                {text2}
              </Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => Toast.hide()}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeIcon, styles.warningText]}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),

  info: ({ text1, text2 }: CustomToastProps) => (
    <View style={styles.infoContainer}>
      <View style={styles.contentRow}>
        <View style={styles.contentLeft}>
          <View style={[styles.iconCircle, styles.infoIconCircle]}>
            <Text style={styles.infoExclamation}>!</Text>
          </View>
          
          <View style={styles.textContainer}>
            {text1 && (
              <Text style={[styles.title, styles.infoText]}>
                {text1}
              </Text>
            )}
            {text2 && (
              <Text style={[styles.subtitle, styles.infoText]}>
                {text2}
              </Text>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => Toast.hide()}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeIcon, styles.infoText]}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  // Common container styles
  successContainer: {
    width: '90%',
    backgroundColor: '#D1F4E0',
    borderWidth: 2,
    borderColor: '#0D9F6E',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 'auto',
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  errorContainer: {
    width: '90%',
    backgroundColor: '#FECDD6',
    borderWidth: 2,
    borderColor: '#C7253E',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 'auto',
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  warningContainer: {
    width: '90%',
    backgroundColor: '#FDE8BA',
    borderWidth: 2,
    borderColor: '#D97706',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 'auto',
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  infoContainer: {
    width: '90%',
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 'auto',
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  
  // Layout styles
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  // Icon styles
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  successIconCircle: {
    borderColor: '#0D9F6E',
  },
  errorIconCircle: {
    borderColor: '#C7253E',
  },
  warningIconCircle: {
    borderColor: '#D97706',
  },
  infoIconCircle: {
    borderColor: '#2563EB',
  },
  
  // Icon text styles
  successCheckmark: {
    color: '#0D9F6E',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorExclamation: {
    color: '#C7253E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  warningExclamation: {
    color: '#D97706',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoExclamation: {
    color: '#2563EB',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  // Text container
  textContainer: {
    flex: 1,
  },
  
  // Text styles
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  successText: {
    color: '#0D9F6E',
  },
  errorText: {
    color: '#C7253E',
  },
  warningText: {
    color: '#D97706',
  },
  infoText: {
    color: '#2563EB',
  },
  
  // Close button styles
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default toastConfig;