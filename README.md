# Bienvenido a este proyecto de ejemplo usando Titanium Classic Framework

Bienvenido a este proyecto de ejemplo, que pretende ilustrar una primera toma de contacto con este framework desde el principio, cubriendo los aspectos básicos: elementos de IU comunes, comunicación con el backend, persistencia, navegación, uso de APIS de terceros (notificaciones, mapas), etc. Este proyecto está construido usando la parte clásica del mismo, en otro proyecto se replicará esto mismo usando Alloy.

He configurado el entorno de trabajo tanto en PC y como en Mac, decantándome por este último S.O. al permitir exportar proyectos de iOS.

## Configuración en PC

Para PC He usado la siguiente configuración:

- Java 8 64bit 
- Congigurar las variables de entorno:
    - variable JAVA_HOME apuntando a C:/Program Files/jdk1.8.0_271
    - variable ANDROID_HOME apuntando a C:\Users\my-user\AppData\Local\Android\Sdk
- Añadir al PATH esta ruta %JAVA_HOME%\bin
- Habilidar la virtualización, tanto en la BIOS como ajustes de Windows: Hyper-V
- Definir la ruta de Android SDK dentro de Appcelerator Studio: Preferences/Platforms/Android/General/Android SDK Home
- OPCIONAL: instalar el emulador Genymotion.
- Podemos obtener un mensaje en los logs de compilación de Appcelerator Studio que dice que nos falta por aceptar licencias del SDK de Android, a pesar de haberlas aceptado al instalarlo. Parece un bug, pero tiene solución: abrimos una terminal y lanzamos lo siguiente para entrar en la aceptación de las licencias: `%ANDROID_HOME%/tools/bin/sdkmanager --licenses`

## Configuración en Mac

El principal problema que encontré en Mac fue que Appcelerator Studio no detectaba los SDK de Java, Android ni XCode. Finalmente siguendo estos pasos la plataforma es capaz de funcionar (siempre según mi experiendia particular):

- instalar el Xcode 11.4 (SDK hasta 13 -> en terminal "xcodebuild -showsdks")
-  Android studio, útima versión
- Git viene con Xcode, no hay que instalarlo
- Java no lo instalo, dejo que el instalador instale esta dependencia (instala la versión 11, con la 8 de 64 bits no funcionaba, no reconocía Java ni añadiéndolo al PATH)
- El último paso es instalar Appcelerator y dejar que instale cli y Java él solo
- Tras actualizar y esperar el comportamiento errático, logra detectar el sdk de ios
- Actualizar o instalar última versión de Xcode (ahora sí detecta el SDK)
- Para el sdk de android debemos indicárselo a mano (ver imagen a continuación):

![SDK paths](./readme_data/01sdk_path.png)

### Otra información útil acerca de la instalación en Mac
----

**Xcode soportados**

https://wiki.appcelerator.org/display/guides2/Titanium+Compatibility+Matrix#TitaniumCompatibilityMatrix-SupportedversionsofXcode

**Borrar otras versiones de java**

```
Sudo rm -rf /Library/Java/JavaVirtualMachines/jdk(version).jdk
Sudo rm -rf /Library/PreferencePanes/JavaControlPanel.prefPane
Sudo rm -rf /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -rf ˜/Library/Application\ Support/Oracle/Java
```

**Ruta SDK Android**

`/Users/usuario/Library/Android`

**Ruta SDK iOS**

`/Applications/Xcode.app/Contents/Developer`

**Matriz de compatibilidad**

`https://wiki.appcelerator.org/display/guides2/Titanium+Compatibility+Matrix#TitaniumCompatibilityMatrix-SupportedversionsofXcode`



# Puesta en marcha

## Documentación oficial

|TÍTULO|CONTENIDO|URL|
|--|--|--|
|Appcelerator Platform|Contiene documentación global de los componente de la plataforma: Titanium SDK, IDE Appcelerator, Framework Alloy...| https://docs.appcelerator.com/platform/latest/#!/api/Global|
|Wiki Appcelerator| Wiki sobre documentación de Titanium SDK| https://wiki.appcelerator.org/display/guides2/Titanium+SDK|
|Amplify Dashboard|Panel de control de las aplicaciones|https://platform.axway.com/#/app|


# Titanium SDK "know how"

## Básico

`Window` es la vista padre de la que pueden colgar hijos. En la mayoría de casos puede existir una única ventana `Window`, pero en el iPad o tablet Android por ejemplo, hay que tener en cuenta que puede haber vista general y detalle.

La filosofía de creación de las interfaces gráficas en Titanium es bastante simple, todo es javascript y se basa de anidar vistas para ir construyendo los layouts, con atributos pasados a partir de un objeto que contendrá las propiedades de la vista.

**Creación de la vista inicial**
```
var window = Ti.UI.createWindow(
{
	title: 'title',
	navBarHidden : true //default is false, esto oculta la barra de navegación. 
});

window.open();

//View

var view = Ti.UI.createView(
{
	backgroudColor: 'Red',
	height: '25dp',
	width: '50%'
});

window.add(view);
```
Si se usa navigation group, entonces se llama a ese grupo y se pasa como parámetro la ventana que se quiere abrir.

- En Android: se agrega `Ti.UI.createWindow({}}`
- En iOS: se agrega `Titanium.UI.iOS.NavigationWindow`:

```
// get the application folder based on if the device is a tablet or handheld
if (Util.isTablet()) {
    ApplicationWindow = require('ui/tablet/ApplicationWindow');
    self = new ApplicationWindow();   
} else {
    // check if the device is ios, android or mobile web
    ApplicationWindow = require('ui/handheld/ApplicationWindow');
    
    if (Util.isIPhone()) {
        navInit = Ti.UI.iOS.createNavigationWindow;    
    } else if (Util.isAndroid()) {
        navInit = false;
    } else {
        navInit = Ti.UI.MobileWeb.createNavigationGroup;
    }  
    
    var applicationWindow = new ApplicationWindow();
    // ios, blackberry or mobileweb
    if (navInit !== false) {
        self = navInit({ window : applicationWindow });    
    } else { // android
        self = applicationWindow;   
    }
}
```

**Estructura de directorios**

- `Resources`: Carpeta raíz donde se aloja el código de la aplicación, la aplicación empieza por el fichero `app.js`
    - `lib`: objetos útiles para el proyecto
    - `android/images/res-land-hdpi...`: Recursos gráficos para android, en código se referenciará el recurso sin extensión y sin la carpeta, el compilador sabrá que recurso elegir en función de la orientación, dpi, etc, en Android.
    - `android/appicon.png...`: Icono de la aplicación
    - `android/default.png...`: Imagen aplicación, splash screen.
    - `iphone/Default.png...`: Imagen aplicación iOS, splash screen.
    - `assets/images`: libre, imágenes ios *.png, *@2x.png, @3x.png, etc. (en el caso específico de android ubicar en `Resources/android/images/res-land...`)
    - `model`: libre, objetos que se comunicarán con el backend o base de datos
    - `ui`: libre, elementos de la interfaz de usuario
- `platform/android|ios`: Carpeta donde se alojarán recursos de las distintas plataformas
- `i18n`: carpeta a añadir para trabajar con varios idiomas (en el caso de Alloy cuelga de `Resources`)
- `modules/iphone/ti.googlemaps/6.1.0`: dentro de módules se agregarán módulos importados, de manera general se organizan así: `modules/platform/nombre_módulo/versión/`

**Splash screen**

Documentación oficial

 https://docs.appcelerator.com/platform/latest/#!/guide/Icons_and_Splash_Screens-section-src-29004897_IconsandSplashScreens-Android

Definida en android como `default.png` y en iOS como `Default.png`, 
Es posible disponer de varias imágenes y recursos de manera general en función tanto de la orientación, tamaño de pantalla, densidad e idioma, pero varía según la plataforma:
- Android: `Resources/android/images/res-en|res-es|res-fr-long-land-hdpi|res-long-land-hdpi... / default.png`
- iOS: `i18n/en|es/Default@2x.png|Default-568h@2x.png|Default-667h@2x.png|Default-Portrait-736h@3x.png|Default-Portrait-2436h@3x.png`

## Fichero `tiapp.xml`

Fichero de configuración de la aplicación

**Partes comunes**
```
<?xml version="1.0" encoding="UTF-8"?><ti:app xmlns:ti="http://ti.appcelerator.org">
    <id>com.kiteris.TitaniumSampleClassic</id>
    <name>TitaniumSampleClassic</name>
    <version>1.0</version>
    <publisher>jesusmartinvazquez</publisher>
    <url/>
    <description>Titanium Sample Classic</description>
    <copyright>2020 by jesusmartinvazquez</copyright>
    <icon>appicon.png</icon>
    <fullscreen>false</fullscreen>
    <navbar-hidden>true</navbar-hidden>
    <analytics>true</analytics>
    <guid>c9012aa6-5248-40e1-9bbb-546fb5d2dbed</guid>
    <property name="ti.ui.defaultunit" type="string">dp</property>
    <property name="run-on-main-thread" type="bool">true</property>   
    <modules>
        <module platform="android">ti.playservices</module>
        <module>ti.map</module>
        <module platform="android">hyperloop</module>
        <module platform="iphone">hyperloop</module>
        <module platform="iphone">ti.googlemaps</module>
        <module platform="commonjs">ti.cloud</module>
        <module platform="android">ti.cloudpush</module>
    </modules>
    <deployment-targets>
        <target device="android">true</target>
        <target device="ipad">true</target>
        <target device="iphone">true</target>
    </deployment-targets>
    <sdk-version>9.3.0.GA</sdk-version>
    <property name="appc-app-id" type="string">5ff838929c5d7d48914f4277</property> 
    ...
    </ti:app>
```

Podemos acceder a las etiquetas `<property>` así: 

```
var foo = Ti.App.Properties.getString('foo');
```

Más documentación:

https://docs.appcelerator.com/platform/latest/?print=/api/Titanium.App.Properties


**Android**
```
<?xml version="1.0" encoding="UTF-8"?><ti:app xmlns:ti="http://ti.appcelerator.org">
...

    <android xmlns:android="http://schemas.android.com/apk/res/android">
        <services>
            <service android:name="AndroidNotiService" type="interval" url="lib/AndroidNotiService.js"/>
        </services>
        <manifest android:label="@string/app_name" android:versionCode="1" xmlns:android="http://schemas.android.com/apk/res/android">
            <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
            <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
            <uses-permission android:name="android.permission.INTERNET" />
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
            <!--<application android:theme="@style/Theme.AppCompat.NoTitleBar">-->
            	<application>
                <meta-data android:name="com.google.android.maps.v2.API_KEY" android:value="AIzaSyBIBTIGWbwAxVjVBS8v0WZ5W5nUP5CqEzg"/>
                <!--El servicio en Titanium aquí no, fuera de manifest y encapsulado en <services> ... -><service android:name="AndroidNotiService" url="lib/AndroidNotiService.js" type="interval" />-->
            </application>
        </manifest>
    </android>
</ti:app>
```

**iOS**

```
<?xml version="1.0" encoding="UTF-8"?><ti:app xmlns:ti="http://ti.appcelerator.org">
...
    <enable-launch-screen-storyboard>true</enable-launch-screen-storyboard>
        <use-app-thinning>true</use-app-thinning>
        <plist>
            <dict>
                <key>UISupportedInterfaceOrientations~iphone</key>
                <array>
                    <string>UIInterfaceOrientationPortrait</string>
                </array>
                <key>UISupportedInterfaceOrientations~ipad</key>
                <array>
                    <string>UIInterfaceOrientationPortrait</string>
                    <string>UIInterfaceOrientationPortraitUpsideDown</string>
                    <string>UIInterfaceOrientationLandscapeLeft</string>
                    <string>UIInterfaceOrientationLandscapeRight</string>
                </array>
                <key>UIRequiresPersistentWiFi</key>
                <false/>
                <key>UIPrerenderedIcon</key>
                <false/>
                <key>UIStatusBarHidden</key>
                <false/>
                <key>UIStatusBarStyle</key>
                <string>UIStatusBarStyleDefault</string>
                <key>NSLocationWhenInUseUsageDescription</key>
                <array>
                    <string>en</string>
                    <string>es</string>
                </array>
                <key>NSLocationAlwaysUsageDescription</key>
                <array>
                    <string>en</string>
                    <string>es</string>
                </array>
            </dict>
        </plist>
    </ios>
</ti:app>
```

Como se puede apreciar, se han incluido string comunes de solicitud de permisos, con soporte para varios idiomas, la clave reside en crear la etiqueta key y debajo un array indicando los idiomas disponibles, estos strings se encuentran en el proyecto, en `Resources/i18n/es|en/app.xml`:
```
<Resources>
	<string name="NSLocationAlwaysUsageDescription">We need to use location services</string>
	<string name="NSLocationWhenInUseUsageDescription">We need to use location services, but only when the applicatioon is in use</string>
	<!--<string name="app_name">titamiumSample</string>-->
</Resources>
```



## Location



