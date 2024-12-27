package com.compiledideas.ansamAlQuran;
import expo.modules.splashscreen.SplashScreenManager;

import android.os.Build;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    // setTheme(R.style.AppTheme);
    // @generated begin expo-splashscreen - expo prebuild (DO NOT MODIFY) sync-9de1acb179e7badd745510fd00d9f3e42afcc9f5
    SplashScreenManager.registerOnActivity(this);
    // @generated end expo-splashscreen
    super.onCreate(null);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here, the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    // Use ReactActivityDelegateWrapper to enable modern features like Fabric and ConcurrentRoot
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      new MainActivityDelegate(this, getMainComponentName())
    );
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to the background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    // If the Android version is less than or equal to R, move the activity to the background
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it does more than {@link Activity#moveTaskToBack}.
    super.invokeDefaultOnBackPressed();
  }

  /**
   * MainActivityDelegate customizes the way the RootView is created.
   * The Fabric Renderer is enabled here if the new architecture is enabled.
   */
  public static class MainActivityDelegate extends ReactActivityDelegate {

    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If the new architecture is enabled, the Fabric renderer is used.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If the new architecture is enabled, Concurrent Root (i.e., React 18) is used.
      // More about this at https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
