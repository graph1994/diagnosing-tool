from django.shortcuts import render
from rest_framework.decorators import detail_route
from rest_framework.response import Response
# Create your views here.
from diagnosing_tool.app.models import Diagnosis, Symptom
from rest_framework import viewsets
from diagnosing_tool.app.serializers import SymptomSerializer, DiagnosisSerializer


class SymptomViewSet(viewsets.ModelViewSet):
    # Endpoint that fetches list of Symptoms
    queryset = Symptom.objects.all()
    serializer_class = SymptomSerializer


class DiagnosisViewSet(viewsets.ModelViewSet):
    # Endpoints that fetches list of Diagnosis
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer

    # Allow filtering by the symptoms
    def get_queryset(self):
        queryset = Diagnosis.objects.all()
        symptom_id = self.request.query_params.get('symptom_id')
        if symptom_id:
            queryset = queryset.filter(symptom_id=symptom_id)

        # order by frequency descending and randomly( not 100% on how random this is).
        # TODO: Investigate how random ? is
        return queryset.order_by('-frequency', '?')

    # Endpoint to allow selecting one diagnosis and updating frequency by 1.
    @detail_route(methods=['patch'])
    def update_fequency(self,request, pk):
        diagnosis = self.get_object()
        diagnosis.frequency = diagnosis.frequency + 1
        diagnosis.save()
        serializer = self.get_serializer(diagnosis)
        return Response(serializer.data)