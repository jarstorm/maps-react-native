Steps to do:


1) rm -rf ios android node_modules
2) npm install
3) react-native upgrade
4) react-native link

To use android maps:
Place this code inside AndroidManifest.xml just before </application>
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="your_key"/>

Add thie permission:
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>