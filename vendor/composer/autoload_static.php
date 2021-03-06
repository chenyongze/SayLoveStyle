<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf689f3bf5606e438ed5cc520a02fe332
{
    public static $files = array (
        '036ec262f4bcc331fe80b225c0cd7b46' => __DIR__ . '/..' . '/terranc/blade/src/helpers.php',
    );

    public static $prefixLengthsPsr4 = array (
        't' => 
        array (
            'think\\composer\\' => 15,
            'think\\' => 6,
            'terranc\\Blade\\' => 14,
        ),
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'think\\composer\\' => 
        array (
            0 => __DIR__ . '/..' . '/topthink/think-installer/src',
        ),
        'think\\' => 
        array (
            0 => __DIR__ . '/../..' . '/thinkphp/library/think',
            1 => __DIR__ . '/..' . '/topthink/think-image/src',
        ),
        'terranc\\Blade\\' => 
        array (
            0 => __DIR__ . '/..' . '/terranc/blade/src',
        ),
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'think\\view\\driver\\Blade' => __DIR__ . '/..' . '/terranc/think-blade/drivers/thinkphp5/Blade.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf689f3bf5606e438ed5cc520a02fe332::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf689f3bf5606e438ed5cc520a02fe332::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitf689f3bf5606e438ed5cc520a02fe332::$classMap;

        }, null, ClassLoader::class);
    }
}
