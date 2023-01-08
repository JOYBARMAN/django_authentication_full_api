from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = User
        fields = ['email','name','tc','password','password2']
        extra_kwargs ={'password':{'write_only':True}}


    def validate(self, attrs):
        password = attrs.get('password')
        password2= attrs.get('password2')
        if len(password)<8:
            raise serializers.ValidationError("Password less than 8 character")
        if password != password2:
            raise serializers.ValidationError("Password don't match")
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    class Meta:
        model = User
        fields = ['email','password']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email','tc']