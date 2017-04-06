Steps to do:


1) rm -rf ios android node_modules
2) npm install
3) react-native upgrade
4) react-native link

To use android maps:
Place this code inside AndroidManifest.xml
<meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="your_key"/>