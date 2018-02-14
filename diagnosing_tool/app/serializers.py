from diagnosing_tool.app.models import Diagnosis, Symptom
from rest_framework import serializers


class SymptomSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Symptom
        fields = ('feature', 'id')


class DiagnosisSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ('symptom', 'name', 'frequency', 'id')

